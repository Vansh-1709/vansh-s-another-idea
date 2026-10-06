export type TopicId = 'arrays' | 'linked_lists' | 'trees' | 'stacks_queues' | 'special_round';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'master';

export interface Question {
  id: string;
  topic: TopicId;
  difficulty: Difficulty;
  level: number; // 1 (Intro) to 4 (Nightmare)
  title: string;
  question: string;
  codeSnippet?: string;
  visualDiagram?: {
    type: 'array' | 'linked_list' | 'tree' | 'stack' | 'queue' | 'text';
    content: string;
  };
  options: string[];
  correctAnswer: number;
  explanation: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  conceptTag: string;
}

export interface GameState {
  currentTopic: TopicId | null;
  score: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  bestStreak: number;
  currentLevel: number;
  questionIndex: number;
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  isCorrect: boolean | null;
  timeLeft: number;
  isGameOver: boolean;
  isVictory: boolean;
  questionsAnswered: number;
  correctAnswersCount: number;
  usedQuestionIds: string[];
  missedQuestions: {
    question: Question;
    selectedAnswer: number;
  }[];
  isTimerActive: boolean;
}

export interface HighScoreRecord {
  id: string;
  date: string;
  score: number;
  topic: TopicId;
  topicName: string;
  questionsAnswered: number;
  accuracy: number;
  maxStreak: number;
}
