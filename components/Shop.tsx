
import React from 'react';
import { Theme, UserState } from '../types';
import { THEMES } from '../constants';

interface ShopProps {
  userState: UserState;
  currentTheme: Theme;
  onBuyTheme: (themeId: string, cost: number) => void;
  onEquipTheme: (themeId: string) => void;
  onClose: () => void;
  theme: Theme;
}

const Shop: React.FC<ShopProps> = ({ userState, currentTheme, onBuyTheme, onEquipTheme, onClose, theme }) => {
  
  return (
    <div className={`h-full overflow-y-auto custom-scrollbar p-6 md:p-12 ${theme.colors.bgApp} transition-colors duration-300 relative`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h2 className={`text-4xl font-extrabold ${theme.colors.textMain} mb-2`}>💎 道具商店</h2>
            <p className={theme.colors.textSecondary}>消费你的宝石，解锁炫酷主题！</p>
          </div>
          
          <div className={`flex items-center gap-4 px-6 py-3 rounded-full border-2 ${theme.colors.border} ${theme.colors.bgPanel} shadow-xl`}>
            <div className="flex items-center gap-2">
               <span className="text-2xl">💎</span>
               <span className={`text-xl font-bold ${theme.colors.textMain}`}>{userState.gems}</span>
            </div>
            <button onClick={onClose} className={`text-sm ${theme.colors.textSecondary} hover:${theme.colors.textMain} underline ml-4`}>
              返回
            </button>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(THEMES).map((item) => {
            const isUnlocked = userState.unlockedThemes.includes(item.id);
            const isEquipped = currentTheme.id === item.id;
            const canAfford = userState.gems >= item.price;

            return (
              <div 
                key={item.id}
                className={`
                  relative group rounded-2xl border-2 overflow-hidden flex flex-col transition-all duration-300
                  ${isEquipped ? 'border-emerald-500 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : `${theme.colors.border} hover:scale-102`}
                  ${theme.colors.bgPanel}
                `}
              >
                {/* Preview Banner */}
                <div className={`h-32 w-full relative overflow-hidden ${item.colors.bgApp} border-b ${theme.colors.border}`}>
                   {/* Mock UI elements to show off theme */}
                   <div className={`absolute top-4 left-4 right-8 h-4 rounded-full ${item.colors.bgPanel} opacity-80`}></div>
                   <div className={`absolute top-12 left-4 w-1/3 h-12 rounded ${item.colors.bgPanel} opacity-60`}></div>
                   <div className={`absolute top-12 right-4 w-1/2 h-20 rounded ${item.colors.bgEditor} border ${item.colors.border}`}>
                      <div className={`m-2 w-3/4 h-2 ${item.colors.textSecondary} bg-current opacity-30 rounded`}></div>
                      <div className={`m-2 w-1/2 h-2 ${item.colors.textMain} bg-current opacity-50 rounded`}></div>
                   </div>
                   
                   {/* Price Badge */}
                   {!isUnlocked && (
                     <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                       {item.price === 0 ? 'FREE' : `💎 ${item.price}`}
                     </div>
                   )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${theme.colors.textMain}`}>{item.name}</h3>
                    {isEquipped && <span className="text-emerald-500 text-xs font-bold uppercase border border-emerald-500 px-2 py-0.5 rounded">使用中</span>}
                  </div>
                  
                  <p className={`text-sm ${theme.colors.textSecondary} mb-6 flex-1`}>
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    {isUnlocked ? (
                       isEquipped ? (
                         <button disabled className="w-full py-3 rounded-xl bg-emerald-900/30 text-emerald-500 font-bold cursor-default border border-emerald-900/50">
                            当前装备
                         </button>
                       ) : (
                         <button 
                           onClick={() => onEquipTheme(item.id)}
                           className={`w-full py-3 rounded-xl font-bold ${theme.colors.buttonSecondary}`}
                         >
                            装备
                         </button>
                       )
                    ) : (
                      <button 
                        onClick={() => onBuyTheme(item.id, item.price)}
                        disabled={!canAfford}
                        className={`
                          w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                          ${canAfford 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg' 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                        `}
                      >
                         <span>购买</span>
                         <span className="text-sm opacity-80">(💎 {item.price})</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Shop;
