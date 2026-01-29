import React from 'react';

interface TutorialOverlayProps {
  step: number;
  onNext: () => void;
  onSkip: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ step, onNext, onSkip }) => {
  // We use fixed positioning to highlight areas because the layout is static.
  // In a more complex app, we would calculate coordinates.
  
  const getHighlightStyle = () => {
    switch(step) {
      case 0: // Welcome - Center
        return "inset-0 bg-black/70 flex items-center justify-center";
      case 1: // Task - Left Panel Top
        return "hidden md:block absolute top-16 left-0 w-1/3 h-2/3 border-4 border-yellow-400 z-50 rounded-br-xl shadow-[0_0_100px_rgba(0,0,0,0.8)]";
      case 2: // Editor - Right Panel Top
        return "hidden md:block absolute top-16 right-0 w-2/3 h-[calc(100%-12rem)] border-4 border-yellow-400 z-50 rounded-bl-xl shadow-[0_0_100px_rgba(0,0,0,0.8)]";
      case 3: // Run Button - Right Panel Bottom Right
        return "hidden md:block absolute bottom-14 right-0 w-48 h-16 border-4 border-yellow-400 z-50 rounded-tl-xl shadow-[0_0_100px_rgba(0,0,0,0.8)]";
      case 4: // Hints - Left Panel Middle
        return "hidden md:block absolute top-1/2 left-0 w-1/3 h-48 border-4 border-yellow-400 z-50 rounded-r-xl shadow-[0_0_100px_rgba(0,0,0,0.8)]";
      default:
        return "hidden";
    }
  };

  const getContent = () => {
    switch(step) {
      case 0:
        return {
          title: "欢迎来到 JavaQuest!",
          text: "这里是你学习编程的起点。不要害怕犯错，让我们一步步来了解这个界面。",
          btn: "开始引导"
        };
      case 1:
        return {
          title: "1. 任务区",
          text: "这里显示你当前关卡需要完成的目标和知识点讲解。如果不知道做什么，先看这里。",
          btn: "下一步"
        };
      case 2:
        return {
          title: "2. 代码编辑区",
          text: "这里是你的工作台。你需要在这里输入 Java 代码来解决问题。",
          btn: "下一步"
        };
      case 3:
        return {
          title: "3. 运行按钮",
          text: "写完代码后，点击这里。系统会运行你的代码并检查是否正确。",
          btn: "下一步"
        };
      case 4:
        return {
          title: "4. 智能提示",
          text: "如果卡住了，点击这里。AI 导师会给你分层提示，助你通关。",
          btn: "完成"
        };
      default:
        return { title: "", text: "", btn: "" };
    }
  };

  const content = getContent();

  if (step === 0) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in p-4">
        <div className="bg-slate-800 p-8 rounded-2xl max-w-md w-full text-center border border-slate-600 shadow-2xl">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
          <p className="text-slate-300 mb-8">{content.text}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={onSkip} className="text-slate-500 hover:text-white font-medium">跳过</button>
            <button onClick={onNext} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold">
              {content.btn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Background Dimmer */}
      <div className="fixed inset-0 z-[55] bg-black/60 md:bg-black/50" /> 
      
      {/* Highlight Box (Desktop Only) */}
      <div className={`${getHighlightStyle()} pointer-events-none transition-all duration-500`}></div>

      {/* Tooltip Card - Positioned centrally on mobile, specifically on desktop */}
      <div className={`
        fixed z-[60] bg-slate-800 p-6 rounded-xl border border-slate-600 shadow-2xl w-[90%] md:w-80 animate-in zoom-in-95 duration-300
        left-1/2 -translate-x-1/2 
        top-1/2 -translate-y-1/2 md:top-auto md:bottom-auto md:translate-y-0
        ${step === 1 ? 'md:top-32 md:left-1/3 md:ml-4' : ''}
        ${step === 2 ? 'md:top-32 md:right-1/3 md:mr-4 md:left-auto md:translate-x-0' : ''}
        ${step === 3 ? 'md:bottom-24 md:right-8 md:top-auto md:left-auto md:translate-x-0' : ''}
        ${step === 4 ? 'md:top-1/2 md:left-1/3 md:ml-4 md:-translate-y-1/2' : ''}
      `}>
        <h3 className="text-xl font-bold text-yellow-400 mb-2">{content.title}</h3>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">{content.text}</p>
        <div className="flex justify-between items-center">
           <span className="text-xs text-slate-500">步骤 {step} / 4</span>
           <button 
             onClick={onNext}
             className="bg-white text-slate-900 hover:bg-slate-200 px-4 py-2 rounded-lg font-bold text-sm"
           >
             {content.btn}
           </button>
        </div>
      </div>
    </>
  );
};

export default TutorialOverlay;