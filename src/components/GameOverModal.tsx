import React, { useState } from 'react';
import { RotateCcw, Home, Trophy, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Question } from '../types/game';

interface GameOverModalProps {
  score: number;
  bestStreak: number;
  questionsAnswered: number;
  correctAnswersCount: number;
  missedQuestions: {
    question: Question;
    selectedAnswer: number;
  }[];
  onRestart: () => void;
  onHome: () => void;
  onOpenLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  bestStreak,
  questionsAnswered,
  correctAnswersCount,
  missedQuestions,
  onRestart,
  onHome,
  onOpenLeaderboard,
}) => {
  const [showReview, setShowReview] = useState(false);
  const accuracy = questionsAnswered > 0 ? Math.round((correctAnswersCount / questionsAnswered) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-rose-900/60 bg-slate-900 p-6 sm:p-8 shadow-2xl text-center my-8">
        {/* Heart broken badge */}
        <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/80 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-rose-950/50 mb-4 animate-shake">
          💔
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Game Over
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          You lost all 3 hearts! Better luck next run.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 my-6 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Final Score</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-0.5">
              {score.toLocaleString()}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Best Streak</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-orange-400 mt-0.5">
              🔥 {bestStreak}x
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Accuracy</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-cyan-400 mt-0.5">
              {accuracy}%
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Questions Solved</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-0.5">
              {correctAnswersCount} / {questionsAnswered}
            </p>
          </div>
        </div>

        {/* Missed Questions Review Accordion */}
        {missedQuestions.length > 0 && (
          <div className="mb-6 text-left border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/40">
            <button
              onClick={() => setShowReview(!showReview)}
              className="w-full flex items-center justify-between p-3.5 text-xs font-mono font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Review Missed Questions ({missedQuestions.length})</span>
              </div>
              {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showReview && (
              <div className="p-3 space-y-4 max-h-60 overflow-y-auto border-t border-slate-800 divide-y divide-slate-800/60">
                {missedQuestions.map(({ question, selectedAnswer }, i) => (
                  <div key={i} className="pt-3 first:pt-0 space-y-1.5 text-xs">
                    <p className="font-semibold text-slate-200">{question.question}</p>
                    <div className="text-[11px] text-rose-400 flex items-center gap-1.5">
                      <span className="font-mono">Your answer:</span>
                      <span>{selectedAnswer >= 0 ? question.options[selectedAnswer] : 'Timed Out'}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-mono">Correct answer:</span>
                      <span className="font-semibold">{question.options[question.correctAnswer]}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2 rounded border border-slate-800">
                      {question.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onHome}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <Home className="w-4 h-4" />
            <span>Select Topic</span>
          </button>
        </div>

        <button
          onClick={onOpenLeaderboard}
          className="mt-3 text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center justify-center gap-1.5 mx-auto transition"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>View High Scores</span>
        </button>
      </div>
    </div>
  );
};
