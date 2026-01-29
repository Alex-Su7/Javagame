import React from 'react';
import { Theme } from '../types';

interface LearningCardProps {
  isOpen: boolean;
  content: {
    concept: string;
    explanation: string;
    exampleCode: string;
  };
  onStart: () => void;
  theme: Theme;
}

const LearningCard: React.FC<LearningCardProps> = ({ isOpen, content, onStart, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 p-4">
      <div className={`${theme.colors.bgPanel} rounded-2xl p-6 md:p-8 max-w-2xl w-full border ${theme.colors.border} shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]`}>
        
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-500" />

        <div className="mb-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl md:text-4xl">🎓</span>
            <div>
              <p className={`text-xs md:text-sm font-bold uppercase tracking-wider ${theme.colors.textSecondary}`}>新知识解锁</p>
              <h2 className={`text-2xl md:text-3xl font-extrabold ${theme.colors.textMain}`}>{content.concept}</h2>
            </div>
          </div>
          
          <div className={`text-base md:text-lg leading-relaxed ${theme.colors.textMain} mb-6`}>
            {content.explanation}
          </div>

          <div className="bg-[#1e1e1e] rounded-lg p-4 border border-slate-700 relative group">
            <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono">Example.java</div>
            <pre className="font-mono text-xs md:text-sm text-slate-300 whitespace-pre-wrap">
              {content.exampleCode}
            </pre>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-700/50 shrink-0">
          <button 
            onClick={onStart}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 ${theme.colors.buttonPrimary}`}
          >
            我学会了，开始挑战！
          </button>
        </div>

      </div>
    </div>
  );
};

export default LearningCard;