import React from 'react';
import { Variable, Theme } from '../types';

interface MemoryVisualizerProps {
  variables: Variable[];
  theme: Theme;
}

const MemoryVisualizer: React.FC<MemoryVisualizerProps> = ({ variables, theme }) => {
  if (!variables || variables.length === 0) return null;

  return (
    <div className={`p-4 border-b ${theme.colors.border} ${theme.colors.bgPanel} transition-colors duration-300`}>
      <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.colors.textSecondary} mb-3 flex items-center gap-2`}>
        <span>🧠</span> 内存快照 (Variables)
      </h3>
      <div className="flex flex-wrap gap-4">
        {variables.map((v, idx) => {
           // Color coding by type
           let boxColor = 'border-slate-500 bg-slate-800/50';
           let typeColor = 'text-slate-400';
           
           if (v.type.toLowerCase().includes('int') || v.type.toLowerCase().includes('number')) {
              boxColor = 'border-blue-500 bg-blue-900/20';
              typeColor = 'text-blue-400';
           } else if (v.type.toLowerCase().includes('string')) {
              boxColor = 'border-orange-500 bg-orange-900/20';
              typeColor = 'text-orange-400';
           } else if (v.type.toLowerCase().includes('boolean')) {
              boxColor = 'border-purple-500 bg-purple-900/20';
              typeColor = 'text-purple-400';
           }

           return (
             <div key={idx} className={`relative min-w-[100px] p-3 rounded-lg border-2 ${boxColor} flex flex-col items-center animate-in zoom-in duration-300`}>
                <span className={`text-[10px] font-mono ${typeColor} absolute top-1 right-2`}>{v.type}</span>
                <span className={`text-xs font-bold ${theme.colors.textSecondary} mb-1`}>{v.name}</span>
                <div className={`text-lg font-mono font-bold ${theme.colors.textMain}`}>
                  {v.value}
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default MemoryVisualizer;