import React from 'react';
import { LEVELS } from '../constants';
import { LevelProgress, Theme } from '../types';

interface LevelMapProps {
  progress: Record<string, LevelProgress>;
  onSelectLevel: (levelId: string) => void;
  theme: Theme;
}

const LevelMap: React.FC<LevelMapProps> = ({ progress, onSelectLevel, theme }) => {
  return (
    <div className={`h-full overflow-y-auto custom-scrollbar p-8 ${theme.colors.bgApp} bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-12 pt-10 pb-20">
        
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${theme.colors.textMain}`}>冒险地图</h2>
          <p className={theme.colors.textSecondary}>通过闯关来掌握 Java 编程技能</p>
        </div>

        {LEVELS.map((level, index) => {
          const userLevel = progress[level.id];
          const isLocked = userLevel?.status === 'LOCKED';
          const isCompleted = userLevel?.status === 'COMPLETED';
          
          return (
            <div key={level.id} className="relative group w-full flex justify-center">
              {/* Connector Line */}
              {index < LEVELS.length - 1 && (
                <div className={`absolute top-16 left-1/2 w-1 h-12 -ml-0.5 z-0 ${theme.id === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`} />
              )}
              
              <button
                onClick={() => !isLocked && onSelectLevel(level.id)}
                disabled={isLocked}
                className={`
                  relative z-10 w-64 p-4 rounded-xl border-2 transition-all duration-300
                  flex flex-col items-center gap-2 shadow-xl
                  ${isLocked 
                    ? `${theme.colors.bgPanel} ${theme.colors.border} opacity-70 cursor-not-allowed` 
                    : isCompleted
                      ? 'bg-emerald-900/30 border-emerald-500 hover:scale-105 shadow-emerald-900/20'
                      : 'bg-indigo-900/30 border-indigo-500 hover:scale-105 shadow-indigo-900/20 animate-pulse'
                  }
                  ${!isLocked && theme.id === 'light' ? 'bg-white' : ''} 
                `}
                // Note: The specific bg colors above (emerald/indigo) are slightly translucent, so they mix with the light/dark bg nicely.
                // However, for pure Light mode, we might want cleaner cards.
                // Let's refine the class logic for light mode specifically for unlocked cards.
                style={isLocked || theme.id === 'dark' || theme.id === 'ocean' ? {} : { backgroundColor: 'white' }}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-1
                  ${isLocked 
                    ? 'bg-slate-700 text-slate-500' 
                    : isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-500 text-white'}
                `}>
                  {isLocked ? '🔒' : isCompleted ? '✓' : level.order}
                </div>
                
                <h3 className={`font-bold ${isLocked ? theme.colors.textSecondary : theme.colors.textMain}`}>
                  {level.title}
                </h3>
                
                <span className={`text-xs px-2 py-0.5 rounded-full ${isLocked ? 'bg-slate-700 text-slate-500' : 'bg-slate-800 text-slate-300'}`}>
                  {level.topic}
                </span>

                {isCompleted && (
                   <div className="flex gap-1 mt-1">
                     {[...Array(3)].map((_, i) => (
                       <span key={i} className={`text-sm ${i < (userLevel.stars || 0) ? 'text-yellow-400' : 'text-slate-700'}`}>★</span>
                     ))}
                   </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelMap;