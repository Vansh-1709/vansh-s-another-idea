import React from 'react';
import { X, Trophy, Flame, Trash2, Calendar, Target } from 'lucide-react';
import { HighScoreRecord } from '../types/game';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  highScores: Record<string, HighScoreRecord>;
  onClearScores: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  highScores,
  onClearScores,
}) => {
  if (!isOpen) return null;

  const records = Object.values(highScores).sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Survival Hall of Fame</h2>
              <p className="text-xs text-slate-400">Personal best records across all DS campaigns</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {records.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs sm:text-sm">
              <Trophy className="w-10 h-10 mx-auto opacity-30 mb-2" />
              <p>No high scores recorded yet.</p>
              <p className="text-slate-600 mt-1">Play a game campaign and survive to establish your high score!</p>
            </div>
          ) : (
            records.map((rec, idx) => (
              <div
                key={rec.id || idx}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-950 transition"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      idx === 0
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : idx === 1
                        ? 'bg-slate-300 text-slate-950'
                        : idx === 2
                        ? 'bg-amber-800 text-amber-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{idx + 1}
                  </span>

                  <div>
                    <h3 className="font-bold text-sm text-white">{rec.topicName}</h3>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-cyan-400" />
                        {rec.accuracy}% Acc ({rec.questionsAnswered} Qs)
                      </span>
                      <span className="flex items-center gap-1 text-orange-400">
                        <Flame className="w-3 h-3" />
                        {rec.maxStreak}x Streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-base font-extrabold text-amber-400">
                    {rec.score.toLocaleString()}
                  </span>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500 font-mono mt-0.5">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>{new Date(rec.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          {records.length > 0 ? (
            <button
              onClick={onClearScores}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/60 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Records</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
