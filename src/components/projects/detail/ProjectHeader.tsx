import { Box, Typography, Stack, Chip, alpha, useTheme } from '@mui/material';
import type { Project } from '@/types';
import { StatusBadge } from '../StatusBadge';

interface ProjectHeaderProps {
    project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    const theme = useTheme();

    return (
        <Stack 
            spacing={3}
            sx={{
                animation: 'fadeInUp 0.7s ease-out',
                animationDelay: '0.1s',
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <StatusBadge status={project.status} size="medium" />
                {project.context && (
                    <Chip
                        label={project.context}
                        size="medium"
                        sx={{
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            height: 32,
                            bgcolor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.secondary.main, 0.15)
                                : alpha(theme.palette.secondary.main, 0.08),
                            color: 'secondary.main',
                            border: theme.palette.mode === 'dark'
                                ? `1px solid ${alpha(theme.palette.secondary.main, 0.35)}`
                                : `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                            backdropFilter: 'blur(8px)',
                        }}
                    />
                )}
            </Box>

            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`
                        : `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.dark} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                {project.title}
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    maxWidth: 896,
                    fontWeight: 400,
                }}
            >
                {project.description}
            </Typography>
        </Stack>
    );
}
