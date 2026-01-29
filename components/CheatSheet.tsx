
import React, { useState, useEffect, useRef } from 'react';
import { Theme } from '../types';

interface CheatSheetProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  theme: Theme;
}

const CheatSheet: React.FC<CheatSheetProps> = ({ isOpen, content, onClose, theme }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  // Reset position if switching to mobile layout
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setPosition({ x: 0, y: 0 });
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Dragging Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({
        x: startPos.current.x + dx,
        y: startPos.current.y + dy
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Disable drag on mobile (width < 768px)
    if (window.innerWidth < 768) return;
    
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    startPos.current = { ...position };
  };

  if (!isOpen) return null;

  return (
    <div 
       className={`
         z-[60] bg-[#1e1e1e]/95 backdrop-blur-md border border-slate-700 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col
         
         /* Mobile: Bottom Sheet Style */
         fixed bottom-0 left-0 w-full h-[45vh] rounded-t-2xl animate-in slide-in-from-bottom duration-300
         
         /* Desktop: Floating Draggable Card */
         md:absolute md:top-8 md:right-8 md:w-96 md:h-auto md:max-h-[60vh] md:bottom-auto md:left-auto md:rounded-xl md:animate-in md:fade-in md:zoom-in-95
         
         ${isDragging ? 'cursor-grabbing select-none' : ''}
       `}
       style={{
         transform: `translate(${position.x}px, ${position.y}px)`,
         // Ensure transitions don't fight with drag
         transition: isDragging ? 'none' : 'transform 0.1s ease-out' 
       }}
    >
       {/* Header with Drag Handle */}
       <div 
         className={`
           flex items-center justify-between p-3 border-b border-slate-700 bg-white/5 
           rounded-t-2xl md:rounded-t-xl
           ${window.innerWidth >= 768 ? 'cursor-move' : ''}
         `}
         onMouseDown={handleMouseDown}
       >
          <h3 className="text-sm font-bold text-yellow-400 flex items-center gap-2 select-none">
             <span>📜</span> 语法备忘 <span className="hidden md:inline text-[10px] text-slate-500 font-normal">(按住拖动)</span>
          </h3>
          <button 
             onClick={onClose}
             className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
             onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking close
             title="关闭"
          >
             ✕
          </button>
       </div>

       {/* Content */}
       <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
          <p className="text-xs text-slate-500 mb-3">
             忘记怎么写了？复制下面的代码模板到编辑器中。
          </p>
          <div className="bg-black/40 p-3 rounded-lg border border-slate-700/50 font-mono text-sm text-slate-300 whitespace-pre-wrap select-text shadow-inner">
             {content}
          </div>
       </div>
    </div>
  );
};

export default CheatSheet;
