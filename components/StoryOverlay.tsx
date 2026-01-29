
import React, { useState, useEffect } from 'react';
import { StoryContent } from '../types';

interface StoryOverlayProps {
  content: StoryContent;
  onNext: () => void;
}

const StoryOverlay: React.FC<StoryOverlayProps> = ({ content, onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    // Typing effect speed based on length
    const speed = 30; 
    
    const timer = setInterval(() => {
      if (index < content.text.length) {
        setDisplayedText(prev => prev + content.text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [content.text]);

  const handleSkip = () => {
    if (isTyping) {
      setDisplayedText(content.text);
      setIsTyping(false);
    } else {
      onNext();
    }
  };

  const getBorderColor = () => {
    switch(content.emotion) {
      case 'ALERT': return 'border-red-500 shadow-red-500/50';
      case 'HAPPY': return 'border-green-500 shadow-green-500/50';
      case 'WORRIED': return 'border-yellow-500 shadow-yellow-500/50';
      default: return 'border-blue-500 shadow-blue-500/50';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 pb-8 md:pb-12 px-4">
      
      {/* Character Portrait */}
      <div className={`
        w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-800 border-4 flex items-center justify-center text-5xl md:text-6xl shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-[-2rem] z-10 animate-bounce
        ${getBorderColor()}
      `}>
        {content.avatar}
      </div>

      {/* Dialogue Box */}
      <div 
        className="w-full max-w-3xl bg-slate-900/95 border-2 border-slate-700 rounded-2xl p-6 md:p-8 pt-10 shadow-2xl cursor-pointer hover:border-slate-500 transition-colors"
        onClick={handleSkip}
      >
        <div className="flex justify-between items-center mb-2">
            <span className={`font-bold text-lg uppercase tracking-wider ${
                content.emotion === 'ALERT' ? 'text-red-400' : 
                content.emotion === 'HAPPY' ? 'text-green-400' : 'text-blue-400'
            }`}>
                {content.character}
            </span>
            <span className="text-xs text-slate-500 animate-pulse">
                {isTyping ? '接收传输中...' : '点击继续 ▶'}
            </span>
        </div>
        
        <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-mono min-h-[4rem]">
          {displayedText}
          {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-slate-400 animate-pulse align-middle"/>}
        </p>
      </div>
    </div>
  );
};

export default StoryOverlay;
