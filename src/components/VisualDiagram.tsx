import React from 'react';

interface VisualDiagramProps {
  type: 'array' | 'linked_list' | 'tree' | 'stack' | 'queue' | 'text';
  content: string;
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({ type, content }) => {
  const getBadgeColor = () => {
    switch (type) {
      case 'array':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
      case 'linked_list':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60';
      case 'tree':
        return 'text-purple-400 bg-purple-950/40 border-purple-800/60';
      case 'stack':
      case 'queue':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="my-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3.5 overflow-x-auto shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getBadgeColor()}`}>
          {type.replace('_', ' ')} Layout
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Structure Diagram</span>
      </div>
      <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed tracking-wide select-all whitespace-pre">
        {content}
      </pre>
    </div>
  );
};
