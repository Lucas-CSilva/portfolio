'use client';

import type { Project } from '@/types';
import { Card, CardContent, Box, Typography, Divider, useTheme, alpha, Stack, Chip } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StatusBadge } from './StatusBadge';

export function ProjectCard(project: Project) {
    const theme = useTheme();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/projects/${project.id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <Box
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${project.title} details`}
            sx={{
                display: 'block',
                height: '100%',
                cursor: 'pointer',
                '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                },
            }}
        >
            <Card
                elevation={0}
                sx={{
                    height: '100%',
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.75)} 100%)`
                        : '#ffffff',
                    backdropFilter: 'blur(20px)',
                    border: theme.palette.mode === 'dark'
                        ? `1px solid ${alpha(theme.palette.divider, 0.3)}`
                        : `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                    borderRadius: 3,
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                    },
                    '&:hover': {
                        transform: 'translateY(-4px) scale(1.01)',
                        boxShadow: theme.palette.mode === 'dark'
                            ? `0 20px 60px ${alpha(theme.palette.common.black, 0.7)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.15)}`
                            : `0 20px 60px ${alpha(theme.palette.common.black, 0.2)}`,
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                        '&::before': {
                            opacity: 1,
                        },
                        '& .project-icon': {
                            color: theme.palette.primary.main,
                            transform: 'translate(2px, -2px)',
                        },
                    },
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 3, sm: 3.5, md: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        height: '100%',
                        minHeight: { md: 280 },
                    }}
                >
                    {/* Header Section */}
                    <Stack spacing={2}>
                        {/* Status Badge - Top Position */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <StatusBadge status={project.status} size="small" />
                            <ArrowUpRight
                                className="project-icon"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    flexShrink: 0,
                                    color: theme.palette.text.secondary,
                                    transition: 'all 0.3s ease',
                                }}
                            />
                        </Box>

                        {/* Title */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                                color: 'text.primary',
                                transition: 'color 0.2s',
                                lineHeight: 1.3,
                            }}
                        >
                            {project.title}
                        </Typography>

                        {/* Context Tag - Below Title */}
                        {project.context && (
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignSelf: 'flex-start',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '6px',
                                    background: theme.palette.mode === 'dark'
                                        ? alpha(theme.palette.secondary.main, 0.12)
                                        : alpha(theme.palette.secondary.main, 0.08),
                                    border: `1px solid ${alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.25 : 0.15)}`,
                                    backdropFilter: 'blur(8px)',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'secondary.main',
                                        fontSize: '0.6875rem',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        lineHeight: 1,
                                    }}
                                >
                                    {project.context}
                                </Typography>
                            </Box>
                        )}


                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.7,
                                color: 'text.secondary',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                fontSize: { xs: '0.875rem', md: '0.9rem' },
                            }}
                        >
                            {project.summary}
                        </Typography>
                    </Stack>

                    {/* Technologies Section */}
                    <Box sx={{ mt: 'auto' }}>
                        <Divider sx={{ mb: 2, borderColor: alpha(theme.palette.divider, 0.4) }} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {project.technologies.slice(0, 4).map((tech) => (
                                <Chip
                                    key={tech}
                                    label={tech}
                                    size="small"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        height: 28,
                                        bgcolor: theme.palette.mode === 'dark'
                                            ? alpha(theme.palette.primary.main, 0.12)
                                            : alpha(theme.palette.primary.main, 0.06),
                                        color: 'primary.main',
                                        border: theme.palette.mode === 'dark'
                                            ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                                            : `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                                        backdropFilter: 'blur(8px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: theme.palette.mode === 'dark'
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.primary.main, 0.12),
                                            transform: 'translateY(-1px)',
                                        },
                                    }}
                                />
                            ))}
                            {project.technologies.length > 4 && (
                                <Chip
                                    label={`+${project.technologies.length - 4}`}
                                    size="small"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        height: 28,
                                        bgcolor: alpha(theme.palette.text.secondary, 0.1),
                                        color: 'text.secondary',
                                        fontFamily: 'monospace',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}