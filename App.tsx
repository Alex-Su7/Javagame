
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LevelMap from './components/LevelMap';
import CodeEditor from './components/CodeEditor';
import Console from './components/Console';
import SuccessModal from './components/SuccessModal';
import TutorialOverlay from './components/TutorialOverlay';
import LearningCard from './components/LearningCard';
import MemoryVisualizer from './components/MemoryVisualizer';
import CheatSheet from './components/CheatSheet';
import Profile from './components/Profile';
import Shop from './components/Shop';
import Confetti from './components/Confetti';
import StoryOverlay from './components/StoryOverlay'; // New
import { ViewState, Level, LevelProgress, UserState, CodeExecutionResult, HintLevel, Theme, Variable } from './types';
import { LEVELS, INITIAL_PROGRESS, THEMES } from './constants';
import { judgeCode, getAIHint } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  
  const [userState, setUserState] = useState<UserState>({
    currentLevelId: null,
    progress: INITIAL_PROGRESS,
    gems: 50, // Give some starter gems to test shop
    streak: 1,
    tutorialCompleted: false,
    unlockedThemes: ['dark', 'light'] // Default unlocked
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.dark);

  // Level State
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [code, setCode] = useState<string>('');
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [executionVariables, setExecutionVariables] = useState<Variable[]>([]);
  const [executionStatus, setExecutionStatus] = useState<'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [feedback, setFeedback] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mobileTab, setMobileTab] = useState<'TASK' | 'CODE'>('TASK');
  
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showStory, setShowStory] = useState(false); // New Story State

  // Hints State
  const [activeHintLevel, setActiveHintLevel] = useState<HintLevel>(HintLevel.NONE);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [isHintLoading, setIsHintLoading] = useState(false);

  // Tutorial State
  const [tutorialStep, setTutorialStep] = useState<number>(-1);

  // --- Effects ---
  useEffect(() => {
    if (userState.currentLevelId) {
      const level = LEVELS.find(l => l.id === userState.currentLevelId);
      if (level) {
        setCurrentLevel(level);
        setCode(level.initialCode);
        setConsoleOutput('');
        setExecutionVariables([]);
        setExecutionStatus('IDLE');
        setFeedback('');
        setActiveHintLevel(HintLevel.NONE);
        setCurrentHintText('');
        setShowSuccessModal(false);
        setMobileTab('TASK');
        setShowCheatSheet(false);
        
        // Narrative Flow Logic
        if (level.story) {
           setShowStory(true);
           setShowLearningCard(false);
        } else {
           setShowStory(false);
           setShowLearningCard(true);
        }
      }
    }
  }, [userState.currentLevelId]);

  const handleStoryNext = () => {
    setShowStory(false);
    setShowLearningCard(true);
  };

  const handleLearningCardStart = () => {
    setShowLearningCard(false);
    if (currentLevel?.id === 'L01' && !userState.tutorialCompleted) {
      setTimeout(() => setTutorialStep(0), 500); 
    }
  };

  // --- Shop & Theme Handlers ---
  const handleBuyTheme = (themeId: string, cost: number) => {
    if (userState.gems >= cost && !userState.unlockedThemes.includes(themeId)) {
        setUserState(prev => ({
            ...prev,
            gems: prev.gems - cost,
            unlockedThemes: [...prev.unlockedThemes, themeId]
        }));
        // Auto equip
        setCurrentTheme(THEMES[themeId]);
    }
  };

  const handleEquipTheme = (themeId: string) => {
    if (userState.unlockedThemes.includes(themeId)) {
        setCurrentTheme(THEMES[themeId]);
    }
  };

  // --- Game Logic Handlers ---
  const handleLevelSelect = (levelId: string) => {
    setUserState(prev => ({ ...prev, currentLevelId: levelId }));
    setView(ViewState.LEVEL);
  };

  const handleResetProgress = () => {
    setUserState({
      currentLevelId: null,
      progress: INITIAL_PROGRESS,
      gems: 50,
      streak: 1,
      tutorialCompleted: false,
      unlockedThemes: ['dark', 'light']
    });
    setView(ViewState.HOME);
    setCurrentTheme(THEMES.dark);
  };

  const handleRunCode = useCallback(async () => {
    if (!currentLevel) return;

    setExecutionStatus('RUNNING');
    setConsoleOutput('编译并运行中...');
    setFeedback('');
    setExecutionVariables([]);
    setMobileTab('CODE');

    const result: CodeExecutionResult = await judgeCode(code, currentLevel);

    setConsoleOutput(result.output);
    setFeedback(result.feedback);
    if (result.variables) {
       setExecutionVariables(result.variables);
    }

    if (result.success) {
      setExecutionStatus('SUCCESS');
      
      setUserState(prev => {
        const newGems = prev.gems + 10;
        const currentProgress = prev.progress[currentLevel.id];
        
        const nextLevelIndex = LEVELS.findIndex(l => l.id === currentLevel.id) + 1;
        let nextProgressState = { ...prev.progress };
        
        nextProgressState[currentLevel.id] = {
           ...currentProgress,
           status: 'COMPLETED',
           stars: 3,
           attempts: (currentProgress.attempts || 0) + 1
        };

        if (nextLevelIndex < LEVELS.length) {
          const nextLevelId = LEVELS[nextLevelIndex].id;
          if (nextProgressState[nextLevelId].status === 'LOCKED') {
             nextProgressState[nextLevelId].status = 'UNLOCKED';
          }
        }

        return {
          ...prev,
          gems: newGems,
          progress: nextProgressState
        };
      });

      setShowSuccessModal(true);
    } else {
      setExecutionStatus('ERROR');
      setUserState(prev => {
          const currentProgress = prev.progress[currentLevel.id];
          return {
              ...prev,
              progress: {
                  ...prev.progress,
                  [currentLevel.id]: {
                      ...currentProgress,
                      attempts: (currentProgress.attempts || 0) + 1
                  }
              }
          }
      });
      if (window.innerWidth < 768) {
         setMobileTab('TASK'); 
      }
    }
  }, [code, currentLevel]);

  const handleGetHint = async () => {
    if (!currentLevel || activeHintLevel >= HintLevel.CODE) return;

    const nextLevel = activeHintLevel + 1;
    setActiveHintLevel(nextLevel);
    setIsHintLoading(true);

    const hint = await getAIHint(code, currentLevel, nextLevel);
    setCurrentHintText(hint);
    setIsHintLoading(false);
  };

  const handleNextLevel = () => {
    setShowSuccessModal(false);
    if (!currentLevel) return;
    const currentIndex = LEVELS.findIndex(l => l.id === currentLevel.id);
    if (currentIndex < LEVELS.length - 1) {
      handleLevelSelect(LEVELS[currentIndex + 1].id);
    } else {
      setView(ViewState.MAP);
    }
  };

  const handleTutorialNext = () => {
    if (tutorialStep < 4) {
      const nextStep = tutorialStep + 1;
      setTutorialStep(nextStep);
      if (nextStep === 2 || nextStep === 3) setMobileTab('CODE');
      else setMobileTab('TASK');
    } else {
      setTutorialStep(-1);
      setUserState(prev => ({ ...prev, tutorialCompleted: true }));
    }
  };

  const handleTutorialSkip = () => {
    setTutorialStep(-1);
    setUserState(prev => ({ ...prev, tutorialCompleted: true }));
  };

  // --- Render ---

  const renderHome = () => (
    <div className={`flex flex-col items-center justify-center h-full ${currentTheme.colors.bgApp} text-center px-4 transition-colors duration-300`}>
      <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl flex items-center justify-center text-5xl mb-8 shadow-2xl rotate-3">
        ☕
      </div>
      <h1 className={`text-5xl font-extrabold ${currentTheme.colors.textMain} mb-6`}>轻松学 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Java</span></h1>
      <p className={`text-xl ${currentTheme.colors.textSecondary} max-w-2xl mb-12`}>
        零基础也没关系。通过趣味闯关、编写真实代码和 AI 即时反馈来掌握编程技能。
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => setView(ViewState.MAP)}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-900/50"
        >
          开始冒险
        </button>
        <button 
          onClick={() => setView(ViewState.SHOP)}
          className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-lg transition-all border border-white/20"
        >
          💎 商店
        </button>
      </div>
    </div>
  );

  const renderLevel = () => {
    if (!currentLevel) return null;

    return (
      <div className={`flex flex-col h-[calc(100vh-64px)] overflow-hidden relative ${currentTheme.colors.bgApp} transition-colors duration-300`}>
        {showStory && currentLevel.story && <StoryOverlay content={currentLevel.story} onNext={handleStoryNext} />}
        {showLearningCard && <LearningCard isOpen={showLearningCard} content={currentLevel.learningContent} onStart={handleLearningCardStart} theme={currentTheme} />}
        <CheatSheet isOpen={showCheatSheet} content={currentLevel.cheatSheet} onClose={() => setShowCheatSheet(false)} theme={currentTheme} />
        {tutorialStep > -1 && !showLearningCard && !showStory && <TutorialOverlay step={tutorialStep} onNext={handleTutorialNext} onSkip={handleTutorialSkip} />}

        <div className="flex-1 flex overflow-hidden relative">
            <div className={`${mobileTab === 'TASK' ? 'flex' : 'hidden'} md:flex md:w-1/3 w-full flex-col ${currentTheme.colors.bgPanel} border-r ${currentTheme.colors.border} transition-colors duration-300`}>
              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-6 relative">
                 <button onClick={() => setShowCheatSheet(!showCheatSheet)} className="absolute top-6 right-6 p-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 text-xs font-bold border border-yellow-500/50 flex items-center gap-1">
                    <span>📜</span> 语法备忘
                 </button>
                <div className="mb-6 mt-2">
                  <span className={`text-xs font-bold ${currentTheme.colors.accent} uppercase tracking-wider mb-1 block`}>{currentLevel.topic}</span>
                  <h2 className={`text-2xl font-bold ${currentTheme.colors.textMain} mb-4`}>{currentLevel.title}</h2>
                  <div className={`prose prose-sm ${currentTheme.id === 'light' ? 'prose-slate' : 'prose-invert'} ${currentTheme.colors.textSecondary}`}>
                    <p className="mb-4">{currentLevel.description}</p>
                    <div className={`p-4 rounded-lg border ${currentTheme.colors.border} mb-4 bg-opacity-50 bg-black/5`}>
                      <h3 className={`font-bold ${currentTheme.colors.textMain} mb-2`}>本关目标:</h3>
                      <p>{currentLevel.task}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-bold uppercase ${currentTheme.colors.textSecondary}`}>提示</h3>
                    <span className={`text-xs ${currentTheme.colors.textSecondary}`}>已使用 {activeHintLevel}/3 </span>
                  </div>
                  {activeHintLevel > 0 && (
                    <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg mb-4 text-yellow-600 dark:text-yellow-200 text-sm">
                      {isHintLoading ? <span className="animate-pulse">咨询 AI 导师中...</span> : currentHintText}
                    </div>
                  )}
                  {activeHintLevel < 3 && (
                    <button onClick={handleGetHint} disabled={isHintLoading} className={`w-full py-2 border ${currentTheme.colors.border} rounded-lg ${currentTheme.colors.textSecondary} hover:${currentTheme.colors.textMain} hover:bg-black/10 transition-colors text-sm flex items-center justify-center gap-2`}>
                      <span>💡</span>{activeHintLevel === 0 ? "获取一个提示" : "我还需要帮助"}
                    </button>
                  )}
                </div>
              </div>
              
              {feedback && (
                <div className={`p-4 border-t ${currentTheme.colors.border} ${executionStatus === 'SUCCESS' ? 'bg-emerald-900/20' : 'bg-red-900/20'}`}>
                    <div className="flex gap-3">
                      <span className="text-2xl">{executionStatus === 'SUCCESS' ? '🎉' : '🤔'}</span>
                      <div>
                        <h4 className={`font-bold text-sm ${executionStatus === 'SUCCESS' ? 'text-emerald-500' : 'text-red-500'}`}>{executionStatus === 'SUCCESS' ? '回答正确!' : '继续加油'}</h4>
                        <p className={`text-sm ${currentTheme.colors.textMain} mt-1`}>{feedback}</p>
                      </div>
                    </div>
                </div>
              )}
            </div>

            <div className={`${mobileTab === 'CODE' ? 'flex' : 'hidden'} md:flex md:w-2/3 w-full flex-col ${currentTheme.colors.bgEditor}`}>
              <div className="flex-1 p-4 pb-0 h-1/2 flex flex-col">
                <div className="flex-1 overflow-hidden">
                   <CodeEditor code={code} onChange={setCode} theme={currentTheme} />
                </div>
              </div>
              <MemoryVisualizer variables={executionVariables} theme={currentTheme} />
              <div className="h-48 p-4 shrink-0">
                <Console output={consoleOutput} status={executionStatus} theme={currentTheme} />
              </div>
              <div className={`h-16 ${currentTheme.colors.bgPanel} border-t ${currentTheme.colors.border} flex items-center justify-end px-6 gap-4 transition-colors duration-300 pb-20 md:pb-0`}>
                <button className={`${currentTheme.colors.textSecondary} hover:${currentTheme.colors.textMain} text-sm font-medium transition-colors`} onClick={() => setCode(currentLevel.initialCode)}>重置代码</button>
                <button onClick={handleRunCode} disabled={executionStatus === 'RUNNING'} className={`px-8 py-2.5 rounded-lg font-bold transition-all transform active:scale-95 flex items-center gap-2 ${executionStatus === 'RUNNING' ? 'bg-slate-600 text-slate-300 cursor-wait' : currentTheme.colors.buttonPrimary}`}>
                  {executionStatus === 'RUNNING' ? '运行中...' : '运行代码 ▶'}
                </button>
              </div>
            </div>
        </div>

        <div className={`md:hidden h-14 ${currentTheme.colors.bgPanel} border-t ${currentTheme.colors.border} flex text-xs font-bold fixed bottom-0 w-full z-40`}>
             <button onClick={() => setMobileTab('TASK')} className={`flex-1 flex flex-col items-center justify-center gap-1 ${mobileTab === 'TASK' ? `${currentTheme.colors.textMain} bg-black/10` : currentTheme.colors.textSecondary}`}>
               <span className="text-lg">📋</span>任务 & 提示
             </button>
             <button onClick={() => setMobileTab('CODE')} className={`flex-1 flex flex-col items-center justify-center gap-1 ${mobileTab === 'CODE' ? `${currentTheme.colors.textMain} bg-black/10` : currentTheme.colors.textSecondary}`}>
               <span className="text-lg">💻</span>代码 & 运行
             </button>
          </div>
      </div>
    );
  };

  return (
    <div className={`h-full flex flex-col ${currentTheme.colors.bgApp} transition-colors duration-300`}>
      <Navbar 
        currentView={view} 
        onNavigate={setView} 
        gems={userState.gems}
        streak={userState.streak}
        currentTheme={currentTheme}
      />
      
      {/* Global Effects */}
      <Confetti isActive={showSuccessModal} />

      <main className="flex-1 overflow-hidden relative">
        {view === ViewState.HOME && renderHome()}
        {view === ViewState.MAP && <LevelMap progress={userState.progress} onSelectLevel={handleLevelSelect} theme={currentTheme} />}
        {view === ViewState.LEVEL && renderLevel()}
        {view === ViewState.PROFILE && <Profile userState={userState} theme={currentTheme} onResetProgress={handleResetProgress} />}
        {view === ViewState.SHOP && (
          <Shop 
             userState={userState} 
             currentTheme={currentTheme} 
             onBuyTheme={handleBuyTheme} 
             onEquipTheme={handleEquipTheme}
             onClose={() => setView(ViewState.HOME)}
             theme={currentTheme}
          />
        )}
      </main>

      <SuccessModal isOpen={showSuccessModal} stars={3} onNext={handleNextLevel} onReplay={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default App;
