'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Input, Kbd } from '@heroui/react';

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
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onValueChange={onChange}
      placeholder={placeholder}
      aria-label="Buscar projetos"
      variant="bordered"
      size="lg"
      radius="lg"
      startContent={<Search className="w-5 h-5 text-default-400" />}
      endContent={
        value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="focus:outline-none"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4 text-default-400 hover:text-foreground" />
          </button>
        ) : (
          <Kbd keys={["command"]} className="hidden sm:inline-flex">
            K
          </Kbd>
        )
      }
      classNames={{
        input: "font-medium",
        inputWrapper: "bg-default-100/50 backdrop-blur-sm group-data-[focus=true]:bg-default-100"
      }}
    />
  );
}
