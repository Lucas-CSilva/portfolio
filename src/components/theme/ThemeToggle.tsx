'use client';

import { IconButton, Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <IconButton size="small" disabled sx={{ opacity: 0.5 }}>
        <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
          Carregando tema
        </Box>
      </IconButton>
    );
  }

  const isDark = theme === 'dark';

  return (
    <IconButton
      size="small"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
      sx={{ 
        position: 'relative', 
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '1.2rem',
          height: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Sun 
          className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
          style={{ 
            color: 'var(--nord3)',
            width: '1.2rem',
            height: '1.2rem',
          }}
        />
        <Moon 
          className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
          style={{ 
            color: 'var(--nord6)',
            width: '1.2rem',
            height: '1.2rem',
          }}
        />
      </Box>
    </IconButton>
  );
}