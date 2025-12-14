import * as React from 'react';
import { Button, Stack, alpha, useTheme } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';

interface ProjectActionsProps {
    liveUrl?: string;
    repoUrl?: string;
}

export function ProjectActions({ liveUrl, repoUrl }: ProjectActionsProps) {
    const theme = useTheme();

    if (!liveUrl && !repoUrl) {
        return null;
    }

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
                animation: 'fadeInUp 0.7s ease-out',
                animationDelay: '0.2s',
                animationFillMode: 'both',
                '@keyframes fadeInUp': {
                    from: {
                        opacity: 0,
                        transform: 'translateY(30px)',
                    },
                    to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                },
            }}
        >
            {liveUrl && (
                <Button
                    variant="contained"
                    size="large"
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LaunchIcon />}
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        textTransform: 'none',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.45)}`,
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    View Live Demo
                </Button>
            )}
            {repoUrl && (
                <Button
                    variant="outlined"
                    size="large"
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHubIcon />}
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        textTransform: 'none',
                        borderWidth: 1.5,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        bgcolor: 'transparent',
                        '&:hover': {
                            borderWidth: 1.5,
                            borderColor: 'primary.main',
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    View Source Code
                </Button>
            )}
        </Stack>
    );
}
