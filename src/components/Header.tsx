import React from 'react';
import { Volume2, VolumeX, BookOpen, Trophy, Flame, RotateCcw } from 'lucide-react';
import { TopicId } from '../types/game';

interface HeaderProps {
  score: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  currentTopic: TopicId | null;
  onOpenCheatSheet: () => void;
  onOpenLeaderboard: () => void;
  onQuitToMenu: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  questionIndex: number;
  currentLevel: number;
  isHeartDamaged?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  score,
  hearts,
  maxHearts,
  streak,
  currentTopic,
  onOpenCheatSheet,
  onOpenLeaderboard,
  onQuitToMenu,
  isMuted,
  onToggleMute,
  questionIndex,
  currentLevel,
  isHeartDamaged,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onQuitToMenu}
            className="flex items-center gap-2.5 text-left group transition focus:outline-none"
            title="Return to Menu"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-mono font-bold text-slate-950 text-base">DS</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-base">
                  ALGO<span className="text-amber-400">ARENA</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/80 uppercase">
                  SURVIVAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Data Structures Survival Quiz</p>
            </div>
          </button>
        </div>

        {/* In-game HUD */}
        {currentTopic && (
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Hearts Life Bar */}
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-all ${
                isHeartDamaged ? 'border-rose-500/60 animate-shake bg-rose-950/20' : ''
              }`}
              title={`${hearts} of ${maxHearts} hearts remaining`}
            >
              <span className="text-xs font-mono uppercase text-slate-400 mr-1 hidden md:inline">Lives:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: maxHearts }).map((_, i) => {
                  const isAlive = i < hearts;
                  return (
                    <span
                      key={i}
                      className={`text-lg transition-transform duration-300 select-none ${
                        isAlive
                          ? 'scale-100 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                          : 'scale-90 opacity-25 grayscale'
                      }`}
                    >
                      {isAlive ? '❤️' : '💔'}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Streak Multiplier */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Flame
                className={`w-4 h-4 transition-colors ${
                  streak >= 5
                    ? 'text-orange-400 animate-pulse fill-orange-400'
                    : streak >= 2
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-500'
                }`}
              />
              <span
                className={`font-mono text-xs font-bold ${
                  streak >= 5 ? 'text-orange-400' : streak >= 2 ? 'text-amber-400' : 'text-slate-400'
                }`}
              >
                {streak > 0 ? `${streak}x` : '0x'}
              </span>
              {streak >= 3 && (
                <span className="text-[10px] font-mono text-amber-300 hidden md:inline">
                  +{Math.round((streak >= 8 ? 2.0 : streak >= 5 ? 1.0 : 0.5) * 100)}% PTS
                </span>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">PTS:</span>
              <span className="font-mono text-sm font-extrabold text-amber-400 tracking-wider">
                {score.toLocaleString()}
              </span>
            </div>

            {/* Level indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-slate-400">STAGE</span>
              <span className="text-amber-400 font-bold">{currentLevel}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Q#{questionIndex + 1}</span>
            </div>
          </div>
        )}

        {/* Global Controls & Modals */}
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Cheat Sheet */}
          <button
            onClick={onOpenCheatSheet}
            title="Data Structures Quick Reference"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">DS Reference</span>
          </button>

          {/* High Scores */}
          <button
            onClick={onOpenLeaderboard}
            title="View High Scores"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Scores</span>
          </button>

          {/* Return button if in game */}
          {currentTopic && (
            <button
              onClick={onQuitToMenu}
              title="Quit to Menu"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition ml-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quit</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
