import React, { useEffect } from 'react';
import { Question } from '../types/game';
import { CodeBlock } from './CodeBlock';
import { VisualDiagram } from './VisualDiagram';
import { Clock, CheckCircle2, XCircle, ArrowRight, Zap, Award } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  isCorrect: boolean | null;
  timeLeft: number;
  maxTime: number;
  streak: number;
  currentLevel: number;
  questionIndex: number;
  totalQuestions: number;
  pointsEarnedLast: number | null;
  onSelectOption: (index: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
}

const LEVEL_LABELS: Record<number, { title: string; color: string; bg: string }> = {
  1: { title: 'Level 1: Apprentice', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800' },
  2: { title: 'Level 2: Engineer', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-800' },
  3: { title: 'Level 3: Architect', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800' },
  4: { title: 'Level 4: Grand Master', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800' },
};

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  isCorrect,
  timeLeft,
  maxTime,
  streak,
  currentLevel,
  questionIndex,
  totalQuestions,
  pointsEarnedLast,
  onSelectOption,
  onSubmitAnswer,
  onNextQuestion,
}) => {
  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (!isAnswerSubmitted) {
        if (['1', 'a', 'A'].includes(e.key)) onSelectOption(0);
        else if (['2', 'b', 'B'].includes(e.key)) onSelectOption(1);
        else if (['3', 'c', 'C'].includes(e.key)) onSelectOption(2);
        else if (['4', 'd', 'D'].includes(e.key)) onSelectOption(3);
        else if (e.key === 'Enter' && selectedAnswer !== null) {
          onSubmitAnswer();
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          onNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerSubmitted, selectedAnswer, onSelectOption, onSubmitAnswer, onNextQuestion]);

  const timeRatio = Math.max(0, timeLeft / maxTime);
  const timeBarColor =
    timeLeft <= 5 ? 'bg-rose-500' : timeLeft <= 10 ? 'bg-amber-500' : 'bg-cyan-500';

  const levelInfo = LEVEL_LABELS[question.level] || LEVEL_LABELS[1];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Question Card Container */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Top Progress & Timer Bar */}
        <div className="w-full bg-slate-950 h-1.5 relative overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${timeBarColor}`}
            style={{ width: `${timeRatio * 100}%` }}
          />
        </div>

        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            {/* Level Tier & Concept */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md border ${levelInfo.bg} ${levelInfo.color}`}
              >
                {levelInfo.title}
              </span>
              <span className="text-xs font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                {question.conceptTag}
              </span>
            </div>

            {/* Timer and Question Counter */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                  timeLeft <= 5
                    ? 'border-rose-500/80 bg-rose-950/40 text-rose-400 animate-pulse'
                    : 'border-slate-800 bg-slate-900 text-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="font-bold">{timeLeft}s</span>
              </div>
              <div className="text-slate-400">
                Progress: <span className="text-white font-bold">{questionIndex + 1}</span> / {totalQuestions}
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {question.question}
          </h2>

          {/* Optional Code Snippet */}
          {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}

          {/* Optional Visual Structure Diagram */}
          {question.visualDiagram && (
            <VisualDiagram
              type={question.visualDiagram.type}
              content={question.visualDiagram.content}
            />
          )}
        </div>

        {/* Options Grid */}
        <div className="p-5 sm:p-6 space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isTargetCorrect = question.correctAnswer === idx;

            let buttonStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 hover:border-slate-700 text-slate-200';
            let keyBadgeStyle = 'bg-slate-800 text-slate-400 group-hover:text-white';

            if (!isAnswerSubmitted) {
              if (isSelected) {
                buttonStyle = 'border-amber-500 bg-amber-950/30 text-amber-200 shadow-md ring-1 ring-amber-500/50';
                keyBadgeStyle = 'bg-amber-500 text-slate-950 font-bold';
              }
            } else {
              if (isTargetCorrect) {
                buttonStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-100 ring-1 ring-emerald-500';
                keyBadgeStyle = 'bg-emerald-500 text-slate-950 font-bold';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500 animate-shake';
                keyBadgeStyle = 'bg-rose-500 text-white font-bold';
              } else {
                buttonStyle = 'border-slate-800/60 bg-slate-950/30 text-slate-500 opacity-60';
                keyBadgeStyle = 'bg-slate-900 text-slate-600';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => onSelectOption(idx)}
                className={`group w-full flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-left transition duration-150 focus:outline-none ${buttonStyle}`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-semibold transition ${keyBadgeStyle}`}
                >
                  {OPTION_KEYS[idx]}
                </span>
                <span className="flex-1 text-sm sm:text-base leading-relaxed select-text">
                  {option}
                </span>

                {isAnswerSubmitted && (
                  <span className="flex-shrink-0 self-center">
                    {isTargetCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-scale" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer / Submit or Advance Action */}
        <div className="p-5 sm:p-6 bg-slate-950/60 border-t border-slate-800/80">
          {!isAnswerSubmitted ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                Press [A-D] or [1-4] to choose · Press [Enter] to submit
              </span>
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={onSubmitAnswer}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  selectedAnswer !== null
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Answer Result Banner */}
              <div
                className={`p-4 rounded-xl border ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-800/80 text-rose-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold text-emerald-400 text-base">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span className="font-bold text-rose-400 text-base">Wrong! -1 Life Lost</span>
                      </>
                    )}
                  </div>

                  {isCorrect && pointsEarnedLast !== null && (
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-amber-950/50 border border-amber-800/60 px-2.5 py-1 rounded-md">
                      <Award className="w-3.5 h-3.5" />
                      +{pointsEarnedLast} PTS
                      {streak > 1 && <span className="text-orange-400">({streak}x Streak)</span>}
                    </div>
                  )}
                </div>

                {/* Explanation Content */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
                  {question.explanation}
                </p>

                {/* Complexity Summary */}
                {(question.timeComplexity || question.spaceComplexity) && (
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-4 text-xs font-mono">
                    {question.timeComplexity && (
                      <span className="text-slate-300">
                        Time:{' '}
                        <span className="text-amber-400 font-semibold">{question.timeComplexity}</span>
                      </span>
                    )}
                    {question.spaceComplexity && (
                      <span className="text-slate-300">
                        Space:{' '}
                        <span className="text-cyan-400 font-semibold">{question.spaceComplexity}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Next Button */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                  Press [Enter] or [Space] to advance
                </span>
                <button
                  type="button"
                  onClick={onNextQuestion}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
