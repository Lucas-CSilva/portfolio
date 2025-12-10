'use client';

import { Box, Typography } from '@mui/material';
import { cn } from '@/lib/utils';

interface ResultsCounterProps {
  showing: number;
  total: number;
}

export function ResultsCounter({ showing, total }: ResultsCounterProps) {
  const isFiltered = showing < total;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontSize: '0.875rem',
        fontWeight: 500,
      }}
    >
      <Typography variant="body2" className="text-[var(--text-secondary)]">
        Exibindo
      </Typography>
      <Box
        component="span"
        sx={{
          px: 1.25,
          py: 0.5,
          borderRadius: '9999px',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: '0.875rem',
          transition: 'all 0.3s',
        }}
        className={cn(
          'border',
          isFiltered
            ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20'
            : 'bg-[var(--bg-elevated)]/50 text-[var(--text-primary)] border-[var(--border-default)]/50'
        )}
      >
        {showing}
      </Box>
      <Typography variant="body2" className="text-[var(--text-secondary)]">
        de {total} {total === 1 ? 'projeto' : 'projetos'}
      </Typography>
    </Box>
  );
}
