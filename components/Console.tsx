import React from 'react';
import { Theme } from '../types';

interface ConsoleProps {
  output: string;
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR';
  theme: Theme;
}

const Console: React.FC<ConsoleProps> = ({ output, status, theme }) => {
  return (
    <div className={`flex flex-col h-full ${theme.colors.bgPanel} border ${theme.colors.border} rounded-lg overflow-hidden transition-colors duration-300`}>
      <div className={`flex items-center justify-between px-4 py-2 border-b ${theme.colors.border} bg-opacity-50 bg-black/5`}>
        <span className={`text-xs font-bold uppercase tracking-wider ${theme.colors.textSecondary}`}>控制台输出 (Console)</span>
        <div className="flex gap-2">
           {status === 'RUNNING' && <span className="text-xs text-blue-400 animate-pulse">运行中...</span>}
           {status === 'SUCCESS' && <span className="text-xs text-emerald-400">构建成功</span>}
           {status === 'ERROR' && <span className="text-xs text-red-400">构建失败</span>}
        </div>
      </div>
      <div className="flex-1 p-4 font-mono text-sm overflow-auto custom-scrollbar">
        {status === 'IDLE' && !output && (
          <span className={`${theme.colors.textSecondary} italic`}>输出结果将显示在这里...</span>
        )}
        {output && (
          <pre className={`whitespace-pre-wrap ${status === 'ERROR' ? 'text-red-400' : theme.colors.textMain}`}>
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Console;