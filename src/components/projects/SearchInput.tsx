'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Buscar projetos...' }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full group">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-24 
          bg-card/50 backdrop-blur-sm
          border border-border/50
          rounded-lg
          text-foreground placeholder:text-muted-foreground/60
          font-medium text-base
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
          hover:border-border
          shadow-sm hover:shadow-md"
        aria-label="Buscar projetos"
      />

      {/* Keyboard Shortcut Hint or Clear Button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 rounded-md
              bg-muted/50 hover:bg-muted
              text-muted-foreground hover:text-foreground
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 
            text-xs font-mono font-semibold
            bg-muted/50 text-muted-foreground
            border border-border/50 rounded
            shadow-sm">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>
    </div>
  );
}
