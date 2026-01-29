
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Theme } from '../types';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
  theme: Theme;
}

const JAVA_KEYWORDS = [
  "public", "class", "static", "void", "main", "String", "int", "double", "boolean", 
  "if", "else", "for", "while", "return", "System", "out", "println", "new", "import"
];

const QUICK_SYMBOLS = [
  ';', '"', '(', ')', '{', '}', '=', '+', '-', 'System.out.println'
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, readOnly = false, theme }) => {
  const [isWrapping, setIsWrapping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Suggestion State
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionPos, setSuggestionPos] = useState({ top: 0, left: 0 });
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  // Power Mode State
  const [combo, setCombo] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const comboTimeoutRef = useRef<number | null>(null);

  // Sync scrolling
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    // Also clear particles or move them? For MVP, clearing or ignoring scroll offset for old particles is easier.
    // We won't clear, but new particles will spawn correctly relative to view.
  };

  // Syntax Highlighting (No changes here, kept as is)
  const highlightedCode = useMemo(() => {
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    let safeCode = escapeHtml(code);
    const placeholders: string[] = [];
    const pushPlaceholder = (html: string) => {
        placeholders.push(html);
        return `___PH${placeholders.length - 1}___`;
    };

    safeCode = safeCode.replace(/(\/\/.*)/g, (match) => pushPlaceholder(`<span class="text-slate-500 italic">${match}</span>`));
    safeCode = safeCode.replace(/(&quot;.*?&quot;)/g, (match) => pushPlaceholder(`<span class="text-amber-400">${match}</span>`));
    const keywordsRegex = new RegExp(`\\b(${JAVA_KEYWORDS.join('|')})\\b`, 'g');
    safeCode = safeCode.replace(keywordsRegex, (match) => pushPlaceholder(`<span class="text-pink-400 font-bold">${match}</span>`));
    safeCode = safeCode.replace(/\b(\d+)\b/g, (match) => pushPlaceholder(`<span class="text-teal-300">${match}</span>`));
    safeCode = safeCode.replace(/\b([A-Z]\w*)\b/g, (match) => {
        if (match.startsWith('___PH')) return match;
        return pushPlaceholder(`<span class="text-yellow-300">${match}</span>`);
    });
    safeCode = safeCode.replace(/___PH(\d+)___/g, (_, index) => placeholders[parseInt(index)]);
    return safeCode;
  }, [code]);

  // --- Particle System Logic ---
  const spawnParticles = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const colors = ['#f472b6', '#38bdf8', '#facc15', '#4ade80'];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 5 + Math.min(combo, 10); i++) {
        newParticles.push({
            x, 
            y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2, // Slight upward bias
            life: 1.0,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 3 + 2
        });
    }
    particlesRef.current.push(...newParticles);
  };

  useEffect(() => {
    let animationId: number;
    const renderParticles = () => {
        if (!canvasRef.current || !textareaRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        
        // Match canvas size to container
        const rect = textareaRef.current.getBoundingClientRect();
        if (canvasRef.current.width !== rect.width || canvasRef.current.height !== rect.height) {
            canvasRef.current.width = rect.width;
            canvasRef.current.height = rect.height;
        }

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        particlesRef.current.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.vy += 0.1; // Gravity

            if (p.life <= 0) {
                particlesRef.current.splice(i, 1);
            } else {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        if (particlesRef.current.length > 0) {
            animationId = requestAnimationFrame(renderParticles);
        } else {
             // Stop loop if empty to save battery
             animationId = requestAnimationFrame(renderParticles);
        }
    };
    
    animationId = requestAnimationFrame(renderParticles);
    return () => cancelAnimationFrame(animationId);
  }, []);


  // --- Input Handling ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    
    // Autocomplete Navigation
    if (showSuggestions) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSuggestionIndex(prev => (prev + 1) % suggestions.length); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSuggestionIndex(prev => (prev - 1 + suggestions.length) % suggestions.length); return; }
      if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); applySuggestion(suggestions[suggestionIndex]); return; }
      if (e.key === 'Escape') { setShowSuggestions(false); return; }
    }

    // Power Mode Logic (Ignore functional keys)
    if (!['Control', 'Shift', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        // Combo
        setCombo(prev => prev + 1);
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        comboTimeoutRef.current = setTimeout(() => setCombo(0), 2000);

        // Shake
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 50);

        // Spawn Particles
        if (textareaRef.current) {
             const caret = textareaRef.current.selectionStart;
             const coords = getCaretCoordinates(textareaRef.current, caret);
             spawnParticles(coords.left, coords.top + 10); // Offset slightly
        }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
     if (showSuggestions && ['ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Escape'].includes(e.key)) return;
     updateSuggestions();
  };

  const updateSuggestions = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const caret = textarea.selectionStart;
    const textBeforeCaret = text.slice(0, caret);
    const match = textBeforeCaret.match(/\b([a-zA-Z]+)$/);
    
    if (match) {
      const word = match[1];
      const filtered = JAVA_KEYWORDS.filter(k => k.toLowerCase().startsWith(word.toLowerCase()) && k !== word);
      if (filtered.length > 0) {
        setSuggestions(filtered);
        setSuggestionIndex(0);
        const { top, left } = getCaretCoordinates(textarea, caret);
        setSuggestionPos({ top: top + 24, left: left });
        setShowSuggestions(true);
        return;
      }
    }
    setShowSuggestions(false);
  };

  const applySuggestion = (suggestion: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const text = textarea.value;
    const caret = textarea.selectionStart;
    const textBeforeCaret = text.slice(0, caret);
    const match = textBeforeCaret.match(/\b([a-zA-Z]+)$/);
    if (match) {
      const word = match[1];
      const newText = text.slice(0, caret - word.length) + suggestion + text.slice(caret);
      onChange(newText);
      setShowSuggestions(false);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = caret - word.length + suggestion.length;
        textarea.focus();
      }, 0);
    }
  };

  const insertSymbol = (symbol: string) => {
    if (readOnly || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = code.substring(0, start) + symbol + code.substring(end);
    onChange(newText);
    
    // Manual trigger for particles on button click
    const coords = getCaretCoordinates(textarea, start);
    spawnParticles(coords.left, coords.top);

    setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
        if (symbol === '()' || symbol === '""' || symbol === '{}') {
           textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
    }, 0);
  };

  const getCaretCoordinates = (element: HTMLTextAreaElement, position: number) => {
    const div = document.createElement('div');
    const style = getComputedStyle(element);
    for (const prop of Array.from(style)) {
      div.style.setProperty(prop, style.getPropertyValue(prop));
    }
    div.style.position = 'absolute'; div.style.visibility = 'hidden';
    div.style.whiteSpace = isWrapping ? 'pre-wrap' : 'pre';
    div.textContent = element.value.substring(0, position);
    const span = document.createElement('span');
    span.textContent = '|';
    div.appendChild(span);
    document.body.appendChild(div);
    const { offsetTop: top, offsetLeft: left } = span;
    document.body.removeChild(div);
    return { top: top - element.scrollTop, left: left - element.scrollLeft };
  };

  const lines = code.split('\n');

  return (
    <div className={`flex flex-col h-full rounded-lg overflow-hidden border ${theme.colors.border} shadow-inner font-mono text-sm bg-[#1e1e1e] transform transition-transform ${isShaking ? 'translate-x-0.5 translate-y-0.5' : ''}`}>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-black/20 shrink-0">
        <div className="px-3 py-1 bg-[#1e1e1e] text-yellow-500 text-xs rounded-t border-t border-x border-slate-700 flex items-center gap-2">
          <span>☕</span> Main.java
        </div>
        <div className="flex items-center gap-4">
             {combo > 0 && (
                <div className={`text-xs font-bold animate-pulse ${combo > 10 ? 'text-red-500 scale-110' : 'text-blue-400'}`}>
                    COMBO x{combo}
                </div>
             )}
            <label className="text-xs text-slate-400 flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={isWrapping} onChange={(e) => setIsWrapping(e.target.checked)} className="rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-0" />
                自动换行
            </label>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden flex">
        <div className="bg-[#1e1e1e] text-slate-600 text-right select-none py-4 px-2 min-w-[3rem] border-r border-slate-800 z-20">
          {lines.map((_, i) => <div key={i} className="leading-6 h-6">{i + 1}</div>)}
        </div>

        <div className="relative flex-1 h-full bg-[#1e1e1e]">
             {/* Particles Layer */}
             <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

             {/* Highlight Layer */}
             <pre ref={preRef} className={`absolute inset-0 m-0 p-4 pointer-events-none leading-6 whitespace-pre ${isWrapping ? 'whitespace-pre-wrap' : ''} overflow-hidden font-mono`} dangerouslySetInnerHTML={{ __html: highlightedCode + '<br/>' }} />
             
             {/* Input Layer */}
             <textarea ref={textareaRef} value={code} onChange={(e) => onChange(e.target.value)} onScroll={handleScroll} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} readOnly={readOnly} className={`absolute inset-0 w-full h-full bg-transparent text-transparent caret-white p-4 leading-6 resize-none outline-none font-mono z-10 whitespace-pre ${isWrapping ? 'whitespace-pre-wrap' : ''}`} spellCheck={false} autoCapitalize="off" autoCorrect="off" />

             {showSuggestions && (
                 <div className="absolute z-50 bg-[#252526] border border-slate-600 rounded shadow-2xl overflow-hidden w-48" style={{ top: suggestionPos.top, left: suggestionPos.left }}>
                     {suggestions.map((s, i) => (
                         <div key={s} className={`px-3 py-1.5 cursor-pointer text-xs flex items-center justify-between ${i === suggestionIndex ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-[#37373d]'}`} onClick={() => applySuggestion(s)}>
                            <span>{s}</span><span className="opacity-50 text-[10px]">Java</span>
                         </div>
                     ))}
                 </div>
             )}
        </div>
      </div>

      <div className="bg-[#252526] p-2 border-t border-black/20 flex gap-2 overflow-x-auto custom-scrollbar shrink-0">
          {QUICK_SYMBOLS.map(symbol => (
            <button key={symbol} onClick={() => insertSymbol(symbol)} className="px-3 py-1.5 bg-[#3e3e42] hover:bg-[#4e4e52] text-slate-200 rounded text-xs font-mono border border-black/20 shadow-sm whitespace-nowrap active:scale-95 transition-transform">{symbol}</button>
          ))}
      </div>
    </div>
  );
};

export default CodeEditor;
