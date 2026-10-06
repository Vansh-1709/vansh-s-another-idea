import { useState, useEffect, useRef, useCallback } from 'react';
import { TopicId, Question, HighScoreRecord } from './types/game';
import { TOPICS, getQuestionsForGame } from './data/questions';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { TopicSelector } from './components/TopicSelector';
import { QuizCard } from './components/QuizCard';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';
import { CheatSheetModal } from './components/CheatSheetModal';
import { LeaderboardModal } from './components/LeaderboardModal';

const QUESTION_TIME_LIMIT = 30; // seconds

export default function App() {
  // Game Configuration & Progress
  const [currentTopic, setCurrentTopic] = useState<TopicId | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  // Surviving State
  const [score, setScore] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const maxHearts = 3;
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [isHeartDamaged, setIsHeartDamaged] = useState<boolean>(false);

  // Current Question Interaction
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [pointsEarnedLast, setPointsEarnedLast] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME_LIMIT);

  // Stats & End Game Tracking
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [missedQuestions, setMissedQuestions] = useState<{ question: Question; selectedAnswer: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  // Modals & Sound Settings
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.isMuted());
  const [highScores, setHighScores] = useState<Record<string, HighScoreRecord>>({});

  // Bonus Heart Toast Notification
  const [bonusHeartToast, setBonusHeartToast] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load high scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('algoarena_high_scores');
      if (saved) {
        setHighScores(JSON.parse(saved));
      }
    } catch {
      // Ignore JSON error
    }
  }, []);

  // Save high score helper
  const saveHighScore = useCallback(
    (finalScore: number, finalStreak: number, answered: number, correct: number) => {
      if (!currentTopic) return;
      const topicObj = TOPICS.find((t) => t.id === currentTopic);
      const topicName = topicObj ? topicObj.name : currentTopic;
      const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;

      setHighScores((prev) => {
        const existing = prev[currentTopic];
        if (!existing || finalScore > existing.score) {
          const updated: Record<string, HighScoreRecord> = {
            ...prev,
            [currentTopic]: {
              id: `${currentTopic}_${Date.now()}`,
              date: new Date().toISOString(),
              score: finalScore,
              topic: currentTopic,
              topicName,
              questionsAnswered: answered,
              accuracy,
              maxStreak: finalStreak,
            },
          };
          try {
            localStorage.setItem('algoarena_high_scores', JSON.stringify(updated));
          } catch {
            // Ignore storage quota error
          }
          return updated;
        }
        return prev;
      });
    },
    [currentTopic]
  );

  // Question Timer Countdown
  useEffect(() => {
    if (!currentTopic || isAnswerSubmitted || isGameOver || isVictory) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }

        // Ticking audio cue on final 4 seconds
        if (prev <= 5) {
          sound.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentTopic, isAnswerSubmitted, isGameOver, isVictory, currentIndex]);

  // Handle Timeout (time expired before answering)
  const handleTimeout = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ || isAnswerSubmitted) return;

    sound.playWrong();
    sound.playHeartLost();

    setIsAnswerSubmitted(true);
    setIsCorrect(false);
    setSelectedAnswer(-1); // -1 signifies timeout
    setPointsEarnedLast(0);
    setStreak(0);

    setIsHeartDamaged(true);
    setTimeout(() => setIsHeartDamaged(false), 800);

    const newHearts = hearts - 1;
    setHearts(newHearts);
    setQuestionsAnswered((prev) => prev + 1);

    setMissedQuestions((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedAnswer: -1,
      },
    ]);

    if (newHearts <= 0) {
      setTimeout(() => {
        sound.playGameOver();
        setIsGameOver(true);
        saveHighScore(score, bestStreak, questionsAnswered + 1, correctAnswersCount);
      }, 1000);
    }
  };

  // Start / Reset a Topic Campaign
  const startTopicGame = (topicId: TopicId) => {
    sound.playClick();
    const fetched = getQuestionsForGame(topicId);
    setQuestions(fetched);
    setCurrentTopic(topicId);
    setCurrentIndex(0);
    setUsedQuestionIds([fetched[0]?.id || '']);
    setScore(0);
    setHearts(maxHearts);
    setStreak(0);
    setBestStreak(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setPointsEarnedLast(null);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setQuestionsAnswered(0);
    setCorrectAnswersCount(0);
    setMissedQuestions([]);
    setIsGameOver(false);
    setIsVictory(false);
  };

  // Option selection
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(index);
  };

  // Submit Answer & Calculate Rewards
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const correct = selectedAnswer === currentQ.correctAnswer;
    setIsAnswerSubmitted(true);
    setIsCorrect(correct);
    setQuestionsAnswered((prev) => prev + 1);

    if (correct) {
      sound.playCorrect();
      setCorrectAnswersCount((prev) => prev + 1);

      // Point calculation: Base + Time Bonus + Streak Multiplier
      const basePts =
        currentQ.level === 1 ? 100 : currentQ.level === 2 ? 200 : currentQ.level === 3 ? 350 : 500;
      const timeBonus = timeLeft * 10;
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      const multiplier =
        newStreak >= 8 ? 3.0 : newStreak >= 5 ? 2.0 : newStreak >= 3 ? 1.5 : 1.0;
      const pointsWon = Math.round((basePts + timeBonus) * multiplier);

      setPointsEarnedLast(pointsWon);
      setScore((prev) => prev + pointsWon);

      // Streak Bonus Power-Up: Recover 1 heart at 5-streak!
      if (newStreak === 5 && hearts < maxHearts) {
        setHearts((h) => Math.min(maxHearts, h + 1));
        sound.playStreakBonus();
        setBonusHeartToast('+1 Heart Recovered from 5x Streak!');
        setTimeout(() => setBonusHeartToast(null), 3000);
      }
    } else {
      sound.playWrong();
      sound.playHeartLost();

      setPointsEarnedLast(0);
      setStreak(0);

      setIsHeartDamaged(true);
      setTimeout(() => setIsHeartDamaged(false), 800);

      const newHearts = hearts - 1;
      setHearts(newHearts);

      setMissedQuestions((prev) => [
        ...prev,
        {
          question: currentQ,
          selectedAnswer,
        },
      ]);

      if (newHearts <= 0) {
        setTimeout(() => {
          sound.playGameOver();
          setIsGameOver(true);
          saveHighScore(score, bestStreak, questionsAnswered + 1, correctAnswersCount);
        }, 1200);
      }
    }
  };

  // Next Question or Victory
  const handleNextQuestion = () => {
    sound.playClick();
    const nextIndex = currentIndex + 1;

    // Check if campaign is finished
    if (nextIndex >= questions.length) {
      sound.playLevelUp();
      const heartBonus = hearts * 500;
      const finalScore = score + heartBonus;
      setScore(finalScore);
      setIsVictory(true);
      saveHighScore(finalScore, bestStreak, questionsAnswered, correctAnswersCount);
      return;
    }

    const nextQ = questions[nextIndex];
    if (nextQ && nextQ.level > questions[currentIndex].level) {
      // Ascended to higher difficulty tier
      sound.playLevelUp();
    }

    setCurrentIndex(nextIndex);
    setUsedQuestionIds((prev) => [...prev, nextQ.id]);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setPointsEarnedLast(null);
    setTimeLeft(QUESTION_TIME_LIMIT);
  };

  // Toggle Mute Audio
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Reset / Return to Main Menu
  const handleQuitToMenu = () => {
    sound.playClick();
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentTopic(null);
    setIsGameOver(false);
    setIsVictory(false);
  };

  // Clear Saved Records
  const handleClearScores = () => {
    try {
      localStorage.removeItem('algoarena_high_scores');
      setHighScores({});
    } catch {
      // Ignore
    }
  };

  const currentQuestion = questions[currentIndex] || null;
  const currentTopicName = TOPICS.find((t) => t.id === currentTopic)?.name || 'Campaign';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header with in-game HUD and utility buttons */}
      <Header
        score={score}
        hearts={hearts}
        maxHearts={maxHearts}
        streak={streak}
        currentTopic={currentTopic}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onQuitToMenu={handleQuitToMenu}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        questionIndex={currentIndex}
        currentLevel={currentQuestion?.level || 1}
        isHeartDamaged={isHeartDamaged}
      />

      {/* Bonus Heart Toast banner */}
      {bonusHeartToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-rose-600 text-white font-mono font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 animate-bounce">
          <span>❤️</span>
          <span>{bonusHeartToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {!currentTopic ? (
          <TopicSelector onSelectTopic={startTopicGame} highScores={highScores} />
        ) : currentQuestion ? (
          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            isCorrect={isCorrect}
            timeLeft={timeLeft}
            maxTime={QUESTION_TIME_LIMIT}
            streak={streak}
            currentLevel={currentQuestion.level}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
            pointsEarnedLast={pointsEarnedLast}
            onSelectOption={handleSelectOption}
            onSubmitAnswer={handleSubmitAnswer}
            onNextQuestion={handleNextQuestion}
          />
        ) : null}
      </main>

      {/* Modals */}
      {isGameOver && (
        <GameOverModal
          score={score}
          bestStreak={bestStreak}
          questionsAnswered={questionsAnswered}
          correctAnswersCount={correctAnswersCount}
          missedQuestions={missedQuestions}
          onRestart={() => currentTopic && startTopicGame(currentTopic)}
          onHome={handleQuitToMenu}
          onOpenLeaderboard={() => {
            setIsGameOver(false);
            setIsLeaderboardOpen(true);
          }}
        />
      )}

      {isVictory && (
        <VictoryModal
          score={score}
          hearts={hearts}
          bestStreak={bestStreak}
          questionsAnswered={questionsAnswered}
          topicName={currentTopicName}
          onRestart={() => currentTopic && startTopicGame(currentTopic)}
          onHome={handleQuitToMenu}
          onOpenLeaderboard={() => {
            setIsVictory(false);
            setIsLeaderboardOpen(true);
          }}
        />
      )}

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        highScores={highScores}
        onClearScores={handleClearScores}
      />
    </div>
  );
}
