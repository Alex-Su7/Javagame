
import React from 'react';
import { ViewState, Theme } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  gems: number;
  streak: number;
  currentTheme: Theme;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, gems, streak, currentTheme }) => {
  return (
    <nav className={`h-16 ${currentTheme.colors.bgPanel} border-b ${currentTheme.colors.border} flex items-center justify-between px-4 md:px-6 select-none z-50 relative transition-colors duration-300`}>
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate(ViewState.HOME)}
      >
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-md shrink-0">
          J
        </div>
        <span className={`font-bold text-xl tracking-tight ${currentTheme.colors.textMain} hidden sm:inline`}>Java<span className={currentTheme.colors.accent}>Quest</span></span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button 
          onClick={() => onNavigate(ViewState.MAP)}
          className={`text-sm font-medium transition-colors flex items-center gap-1 ${currentView === ViewState.MAP ? currentTheme.colors.textMain : `${currentTheme.colors.textSecondary} hover:${currentTheme.colors.textMain}`}`}
          title="冒险地图"
        >
          <span className="text-lg md:hidden">🗺️</span>
          <span className="hidden md:inline">冒险地图</span>
        </button>
        <button 
          onClick={() => onNavigate(ViewState.PROFILE)}
          className={`text-sm font-medium transition-colors flex items-center gap-1 ${currentView === ViewState.PROFILE ? currentTheme.colors.textMain : `${currentTheme.colors.textSecondary} hover:${currentTheme.colors.textMain}`}`}
          title="个人中心"
        >
          <span className="text-lg md:hidden">👤</span>
          <span className="hidden md:inline">个人中心</span>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Gems / Shop Button */}
        <button 
            onClick={() => onNavigate(ViewState.SHOP)}
            className={`flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full border ${currentTheme.colors.border} bg-opacity-50 hover:bg-black/10 transition-colors`} 
            title="进入商店"
        >
          <span className="text-blue-400 text-xs md:text-base">💎</span>
          <span className={`text-xs md:text-sm font-bold ${currentTheme.colors.textMain}`}>{gems}</span>
          <span className="bg-red-500 text-white text-[9px] px-1 rounded ml-1 animate-pulse">NEW</span>
        </button>

        <div className={`flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full border ${currentTheme.colors.border} bg-opacity-50`} title="连胜天数">
          <span className="text-orange-400 text-xs md:text-base">🔥</span>
          <span className={`text-xs md:text-sm font-bold ${currentTheme.colors.textMain}`}>{streak}</span>
        </div>
        
        <img 
          src="https://picsum.photos/40/40" 
          alt="User" 
          className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 ${currentTheme.colors.border} hidden sm:block`}
        />
      </div>
    </nav>
  );
};

export default Navbar;
