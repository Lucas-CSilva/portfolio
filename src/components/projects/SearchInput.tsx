'use client';

import { TextField, InputAdornment, IconButton, Chip, Box } from '@mui/material';
import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Buscar projetos...' }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <TextField
      inputRef={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      fullWidth
      size="medium"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search className="w-5 h-5 text-[var(--text-muted)]" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {value ? (
              <IconButton
                size="small"
                onClick={() => onChange('')}
                aria-label="Limpar busca"
                sx={{ p: 0.5 }}
              >
                <X className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
              </IconButton>
            ) : (
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Chip
                  label="⌘ K"
                  size="small"
                  sx={{
                    height: '24px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '0.375rem',
                  }}
                  className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                />
              </Box>
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiInputBase-input': {
          fontWeight: 500,
        },
        '& .MuiOutlinedInput-root': {
          backdropFilter: 'blur(8px)',
        },
      }}
      className="bg-[var(--bg-elevated)]/50"
    />
  );
}
