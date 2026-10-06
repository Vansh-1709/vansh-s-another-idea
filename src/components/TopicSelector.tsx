import React from 'react';
import { TopicId, HighScoreRecord } from '../types/game';
import { TOPICS, TopicInfo } from '../data/questions';
import {
  Layers,
  Link as LinkIcon,
  Network,
  Rows3,
  Flame,
  Heart,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface TopicSelectorProps {
  onSelectTopic: (topicId: TopicId) => void;
  highScores: Record<string, HighScoreRecord>;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic, highScores }) => {
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-emerald-400" />;
      case 'Link':
        return <LinkIcon className="w-6 h-6 text-cyan-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-purple-400" />;
      case 'Rows3':
        return <Rows3 className="w-6 h-6 text-amber-400" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-rose-400" />;
      default:
        return <Layers className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-10 text-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Data Structures Survival Quiz</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Data Structures</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Battle through progressive difficulty tiers. Earn points for correct answers, survive with <strong className="text-rose-400">3 hearts</strong>, chain streak combos, and face the ultimate multi-topic Boss Gauntlet.
          </p>
        </div>

        {/* Game Rules / Feature Highlights */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80 text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-400 flex-shrink-0">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">3 Hearts Life Limit</h2>
              <p className="text-xs text-slate-400 mt-1">
                You lose 1 heart for every wrong answer or timeout. Drop to 0 and it’s Game Over!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Scaling Difficulty</h2>
              <p className="text-xs text-slate-400 mt-1">
                Questions escalate from Apprentice fundamentals to Master code tracing &amp; systems architecture.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-400 flex-shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">No Repeated Questions</h2>
              <p className="text-xs text-slate-400 mt-1">
                Every run pulls fresh, unrepeated challenges with in-depth explanations &amp; complexity breakdowns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Selection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Choose Your Challenge</h2>
            <p className="text-xs text-slate-400 mt-0.5">Select a focused data structure domain or enter the mixed Boss Gauntlet.</p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            5 Game Campaigns Available
          </span>
        </div>

        {/* Special Gauntlet Highlight Card */}
        {TOPICS.filter(t => t.id === 'special_round').map(topic => {
          const topicScore = highScores[topic.id];
          return (
            <div
              key={topic.id}
              className="relative rounded-2xl border-2 border-rose-500/50 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 p-6 sm:p-7 shadow-xl hover:border-rose-400 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-l from-rose-500 to-orange-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-widest rounded-bl-xl shadow-md">
                ★ BOSS MODE ★
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 flex-shrink-0 group-hover:scale-105 transition-transform">
                    {getTopicIcon(topic.icon)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-white">{topic.name}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                        Mixed All-Round
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                      <span>Heaps · Tries · Graphs · Disjoint Sets · Hard Pointers</span>
                      {topicScore && (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5" /> High: {topicScore.score.toLocaleString()} pts
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className="w-full md:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 active:scale-95 transition flex-shrink-0"
                >
                  <span>Start Boss Gauntlet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Standard Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {TOPICS.filter(t => t.id !== 'special_round').map((topic: TopicInfo) => {
            const topicScore = highScores[topic.id];

            return (
              <div
                key={topic.id}
                className={`relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 hover:bg-slate-900 transition flex flex-col justify-between group ${topic.accentBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition-transform">
                      {getTopicIcon(topic.icon)}
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {topic.totalAvailable} questions
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{topic.tagline}</p>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs font-mono">
                    {topicScore ? (
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Best: {topicScore.score.toLocaleString()} pts</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">Unplayed</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTopic(topic.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white transition flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Play Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
