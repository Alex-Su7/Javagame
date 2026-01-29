import React from 'react';
import { UserState, Theme, LevelProgress } from '../types';
import { LEVELS } from '../constants';

interface ProfileProps {
  userState: UserState;
  theme: Theme;
  onResetProgress: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userState, theme, onResetProgress }) => {
  // 1. Calculate Statistics
  // Fix: Explicitly cast Object.values to LevelProgress[] to avoid "unknown" type errors
  const progressValues = Object.values(userState.progress) as LevelProgress[];
  const totalLevels = LEVELS.length;
  const completedLevels = progressValues.filter(p => p.status === 'COMPLETED').length;
  const progressPercentage = Math.round((completedLevels / totalLevels) * 100);
  const totalStars = progressValues.reduce((acc, curr) => acc + curr.stars, 0);
  const totalAttempts = progressValues.reduce((acc, curr) => acc + curr.attempts, 0);

  // 2. Determine Title based on Gems
  const getTitle = (gems: number) => {
    if (gems < 50) return "Java 学徒 (Novice)";
    if (gems < 150) return "代码探险家 (Explorer)";
    if (gems < 300) return "逻辑构建者 (Builder)";
    return "Java 大师 (Master)";
  };

  // 3. Define Achievements Logic
  const achievements = [
    {
      id: 'first_blood',
      icon: '🌱',
      title: '初出茅庐',
      desc: '完成第 1 个关卡',
      unlocked: completedLevels >= 1
    },
    {
      id: 'streak_master',
      icon: '🔥',
      title: '持之以恒',
      desc: '获得 3 天以上连胜',
      unlocked: userState.streak >= 3
    },
    {
      id: 'star_hunter',
      icon: '⭐',
      title: '摘星者',
      desc: '获得 5 颗星星',
      unlocked: totalStars >= 5
    },
    {
      id: 'rich_kid',
      icon: '💎',
      title: '小富翁',
      desc: '拥有 100 颗宝石',
      unlocked: userState.gems >= 100
    },
    {
      id: 'perfectionist',
      icon: '🏆',
      title: '完美主义',
      desc: '在任意一关获得 3 星',
      // Fix: Use progressValues for type safety
      unlocked: progressValues.some(p => p.stars === 3)
    },
    {
      id: 'hacker',
      icon: '💻',
      title: '极客精神',
      desc: '完成所有现有关卡',
      unlocked: completedLevels === totalLevels
    }
  ];

  return (
    <div className={`h-full overflow-y-auto custom-scrollbar p-4 md:p-8 ${theme.colors.bgApp} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className={`${theme.colors.bgPanel} border ${theme.colors.border} rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl`}>
          <div className="relative">
            <img 
              src="https://picsum.photos/200/200" 
              alt="Profile" 
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${theme.colors.border} shadow-lg`}
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full border border-white">
              Lv.{Math.floor(userState.gems / 50) + 1}
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className={`text-2xl md:text-3xl font-bold ${theme.colors.textMain} mb-2`}>Player One</h2>
            <p className={`text-sm md:text-base font-medium ${theme.colors.accent} mb-4`}>{getTitle(userState.gems)}</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-black/20 rounded-full h-4 overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className={`flex justify-between text-xs mt-2 ${theme.colors.textSecondary}`}>
              <span>总进度</span>
              <span>{progressPercentage}% ({completedLevels}/{totalLevels})</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '累计宝石', value: userState.gems, icon: '💎', color: 'text-blue-400' },
            { label: '获得星星', value: totalStars, icon: '⭐', color: 'text-yellow-400' },
            { label: '连胜天数', value: userState.streak, icon: '🔥', color: 'text-orange-400' },
            { label: '尝试次数', value: totalAttempts, icon: '⌨️', color: 'text-pink-400' },
          ].map((stat, idx) => (
            <div key={idx} className={`${theme.colors.bgPanel} border ${theme.colors.border} p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm hover:transform hover:scale-105 transition-transform`}>
              <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
              <span className={`text-2xl font-bold ${theme.colors.textMain}`}>{stat.value}</span>
              <span className={`text-xs ${theme.colors.textSecondary} uppercase tracking-wider`}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className={`${theme.colors.bgPanel} border ${theme.colors.border} rounded-2xl p-6`}>
          <h3 className={`text-xl font-bold ${theme.colors.textMain} mb-6 flex items-center gap-2`}>
            <span>🏆</span> 成就墙
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div 
                key={ach.id} 
                className={`
                  p-4 rounded-xl border flex items-center gap-4 transition-all
                  ${ach.unlocked 
                    ? `${theme.colors.bgApp} ${theme.colors.border} opacity-100` 
                    : `bg-black/20 border-transparent opacity-50 grayscale`}
                `}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-black/20`}>
                  {ach.icon}
                </div>
                <div>
                  <h4 className={`font-bold ${ach.unlocked ? theme.colors.textMain : theme.colors.textSecondary}`}>
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-500">{ach.desc}</p>
                </div>
                {ach.unlocked && <span className="ml-auto text-emerald-500 text-sm">✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Settings / Danger Zone */}
        <div className={`${theme.colors.bgPanel} border ${theme.colors.border} rounded-2xl p-6`}>
          <h3 className={`text-xl font-bold ${theme.colors.textMain} mb-4`}>设置</h3>
          <div className="flex items-center justify-between p-4 bg-red-900/10 border border-red-900/30 rounded-xl">
            <div>
              <h4 className="text-red-400 font-bold mb-1">重置所有进度</h4>
              <p className="text-xs text-red-300/60">此操作不可撤销，你的宝石、星星和关卡进度将被清空。</p>
            </div>
            <button 
              onClick={() => {
                if(confirm('确定要重置所有游戏进度吗？这是一个不可撤销的操作。')) {
                  onResetProgress();
                }
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-colors"
            >
              重置数据
            </button>
          </div>
        </div>

        <div className={`text-center text-xs ${theme.colors.textSecondary} py-8`}>
          JavaQuest v1.5.0 &copy; 2025 Gamified Learning Inc.
        </div>

      </div>
    </div>
  );
};

export default Profile;