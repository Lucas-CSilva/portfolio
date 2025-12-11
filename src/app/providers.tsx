'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/lib/theme/muiTheme';
import { useMemo, useState, useEffect } from 'react';

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by only rendering MUI after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = useMemo(
    () => theme === 'dark' ? darkTheme : lightTheme,
    [theme]
  );

  // Return null during SSR to avoid hydration mismatches with MUI's CSS-in-JS
  if (!mounted) {
    return null;
  }

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
    >
      <MuiThemeWrapper>
        {children}
      </MuiThemeWrapper>
    </NextThemesProvider>
  );
}
