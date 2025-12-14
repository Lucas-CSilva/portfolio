import * as React from 'react';
import { Box, Stack, Typography, Chip, alpha, useTheme } from '@mui/material';

interface TechnologyStackProps {
    technologies: string[];
}

export function TechnologyStack({ technologies }: TechnologyStackProps) {
    const theme = useTheme();

    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: '1.375rem', md: '1.5rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                    }}
                >
                    Technology Stack
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.9375rem',
                    }}
                >
                    Core technologies and frameworks used in this project
                </Typography>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                }}
            >
                {technologies.map((tech, index) => (
                    <Chip
                        key={tech}
                        label={tech}
                        size="medium"
                        sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            height: 38,
                            px: 1,
                            bgcolor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.main, 0.15)
                                : alpha(theme.palette.primary.main, 0.08),
                            color: 'primary.main',
                            border: theme.palette.mode === 'dark'
                                ? `1px solid ${alpha(theme.palette.primary.main, 0.35)}`
                                : `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s ease',
                            animation: 'fadeInScale 0.5s ease-out both',
                            animationDelay: `${index * 50}ms`,
                            '@keyframes fadeInScale': {
                                from: {
                                    opacity: 0,
                                    transform: 'scale(0.8)',
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'scale(1)',
                                },
                            },
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.primary.main, 0.25)
                                    : alpha(theme.palette.primary.main, 0.15),
                                borderColor: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.primary.main, 0.6)
                                    : alpha(theme.palette.primary.main, 0.4),
                                transform: 'translateY(-2px) scale(1.05)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                                    : `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                            },
                        }}
                    />
                ))}
            </Box>
        </Stack>
    );
}
