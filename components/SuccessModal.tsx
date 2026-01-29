import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onNext: () => void;
  onReplay: () => void;
  stars: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onNext, onReplay, stars }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full border border-slate-600 shadow-2xl transform scale-100 animate-in zoom-in-95 duration-300 text-center">
        
        <div className="mb-6 relative">
          <div className="text-6xl animate-bounce mb-2">🏆</div>
          <h2 className="text-3xl font-bold text-white mb-1">挑战成功!</h2>
          <p className="text-slate-400">代码编写非常出色！</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
           {[1, 2, 3].map((star) => (
             <span key={star} className={`text-4xl transition-all duration-500 ${star <= stars ? 'text-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-slate-700'}`}>★</span>
           ))}
        </div>

        <div className="space-y-3">
          <button 
            onClick={onNext}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/50 transition-transform active:scale-95"
          >
            下一关
          </button>
          <button 
            onClick={onReplay}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-bold transition-transform active:scale-95"
          >
            留在这里
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuccessModal;