import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, RotateCcw, Home, Sparkles, Heart } from 'lucide-react';

interface VictoryModalProps {
  score: number;
  hearts: number;
  bestStreak: number;
  questionsAnswered: number;
  topicName: string;
  onRestart: () => void;
  onHome: () => void;
  onOpenLeaderboard: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  hearts,
  bestStreak,
  questionsAnswered,
  topicName,
  onRestart,
  onHome,
  onOpenLeaderboard,
}) => {
  useEffect(() => {
    // Fire celebratory confetti cannons
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const timeout = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  const heartBonus = hearts * 500;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/50 bg-slate-900 p-6 sm:p-8 shadow-2xl text-center my-8">
        {/* Crown / Trophy icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/50 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 mb-4 animate-bounce">
          👑
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAMPAIGN CONQUERED!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Master of {topicName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          You survived all progressive difficulty tiers with lives remaining!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 my-6 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Total Score</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-0.5">
              {score.toLocaleString()}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Hearts Remaining</span>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="text-base">
                  {i < hearts ? '❤️' : '💔'}
                </span>
              ))}
              <span className="text-xs font-mono text-emerald-400 font-bold ml-1">
                +{heartBonus} pts
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Best Combo</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-orange-400 mt-0.5">
              🔥 {bestStreak}x
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Questions Cleared</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-0.5">
              {questionsAnswered} Cleared
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onHome}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <Home className="w-4 h-4" />
            <span>Select Another Topic</span>
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
