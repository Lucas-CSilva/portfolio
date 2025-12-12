'use client';

import { Box, Typography, useTheme, alpha } from '@mui/material';

interface ResultsCounterProps {
    showing: number;
    total: number;
}

export function ResultsCounter({ showing, total }: ResultsCounterProps) {
    const theme = useTheme();
    const isFiltered = showing < total;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                background: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.4)
                    : alpha('#ffffff', 0.6),
                backdropFilter: 'blur(12px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                }}
            >
                Exibindo
            </Typography>
            <Box
                component="span"
                sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '12px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    bgcolor: isFiltered
                        ? alpha(theme.palette.primary.main, 0.15)
                        : alpha(theme.palette.text.secondary, 0.08),
                    color: isFiltered ? 'primary.main' : 'text.primary',
                    border: `1px solid ${isFiltered
                        ? alpha(theme.palette.primary.main, 0.3)
                        : alpha(theme.palette.divider, 0.3)}`,
                    boxShadow: isFiltered
                        ? `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`
                        : 'none',
                }}
            >
                {showing}
            </Box>
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                }}
            >
                de {total} {total === 1 ? 'projeto' : 'projetos'}
            </Typography>
        </Box>
    );
}