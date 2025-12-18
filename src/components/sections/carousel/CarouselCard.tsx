import {
    Card,
    CardContent,
    Button,
    Box,
    Typography,
    Divider,
    Chip,
    Stack,
    useTheme,
    alpha,
} from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';
import type { Project } from '@/types';
import { StatusBadge } from '../../projects/StatusBadge';

export interface CarouselCardProps {
    project: Project;
    position: number;
    onClick: () => void;
}

interface CardStyle {
    opacity: number;
    transform: string;
    zIndex: number;
    pointerEvents: 'auto' | 'none';
}

function getCardStyle(position: number): CardStyle {
    const isCurrent = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isVisible = Math.abs(position) <= 1;

    if (!isVisible) {
        return {
            opacity: 0,
            transform: `translateX(${position * 100}%) scale(0.7)`,
            zIndex: 0,
            pointerEvents: 'none',
        };
    }

    if (isCurrent) {
        return {
            opacity: 1,
            transform: 'translateX(0) scale(1)',
            zIndex: 10,
            pointerEvents: 'auto',
        };
    }

    if (isAdjacent) {
        const direction = position > 0 ? 1 : -1;
        return {
            opacity: 0.4,
            transform: `translateX(${direction * 75}%) scale(0.85)`,
            zIndex: 5,
            pointerEvents: 'none',
        };
    }

    return {
        opacity: 0,
        transform: `translateX(${position * 100}%) scale(0.7)`,
        zIndex: 0,
        pointerEvents: 'none',
    };
}

export function CarouselCard({ project, position, onClick }: CarouselCardProps) {
    const theme = useTheme();
    const cardStyle = getCardStyle(position);
    const isCurrent = position === 0;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isCurrent && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <Box
            onClick={() => isCurrent && onClick()}
            onKeyDown={handleKeyDown}
            tabIndex={isCurrent ? 0 : -1}
            role="button"
            aria-label={`View ${project.title} details`}
            sx={{
                position: 'absolute',
                width: '100%',
                maxWidth: { xs: '100%', md: 900, lg: 1000 },
                cursor: isCurrent ? 'pointer' : 'default',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: cardStyle.opacity,
                transform: cardStyle.transform,
                zIndex: cardStyle.zIndex,
                pointerEvents: cardStyle.pointerEvents,
                '&:focus-visible': isCurrent
                    ? {
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: 4,
                          borderRadius: 3,
                      }
                    : {},
            }}
        >
            <Card
                elevation={0}
                sx={{
                    width: '100%',
                    background:
                        theme.palette.mode === 'dark'
                            ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(
                                  theme.palette.background.paper,
                                  0.75
                              )} 100%)`
                            : '#ffffff',
                    backdropFilter: 'blur(20px)',
                    border: isCurrent
                        ? theme.palette.mode === 'dark'
                            ? `1px solid ${alpha(theme.palette.primary.main, 0.6)}`
                            : `1px solid ${alpha(theme.palette.primary.main, 0.4)}`
                        : theme.palette.mode === 'dark'
                        ? `1px solid ${alpha(theme.palette.divider, 0.3)}`
                        : `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isCurrent
                        ? theme.palette.mode === 'dark'
                            ? `0 20px 60px ${alpha(theme.palette.common.black, 0.7)}, 0 0 40px ${alpha(
                                  theme.palette.primary.main,
                                  0.15
                              )}`
                            : `0 20px 60px ${alpha(theme.palette.common.black, 0.2)}`
                        : theme.palette.mode === 'dark'
                        ? `0 4px 16px ${alpha(theme.palette.common.black, 0.4)}`
                        : `0 4px 16px ${alpha(theme.palette.common.black, 0.08)}`,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        opacity: isCurrent ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                    },
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 3, sm: 4, md: 5, lg: 6 },
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack spacing={{ xs: 3, md: 3.5 }} sx={{ flex: 1 }}>
                        <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '1.875rem', lg: '2rem' },
                                        fontWeight: 700,
                                        letterSpacing: '-0.02em',
                                        color: 'text.primary',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {project.title}
                                </Typography>
                                <StatusBadge status={project.status} size="medium" />
                            </Box>
                            {project.context && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'primary.main',
                                        fontSize: { xs: '0.875rem', md: '0.9rem' },
                                    }}
                                >
                                    {project.context}
                                </Typography>
                            )}
                            <Typography
                                variant="body1"
                                sx={{
                                    lineHeight: 1.7,
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    mt: 1,
                                }}
                            >
                                {project.description}
                            </Typography>
                        </Stack>
                        <Stack spacing={2}>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 600,
                                    letterSpacing: '0.12em',
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                }}
                            >
                                Technology Stack
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                }}
                            >
                                {project.technologies.map((tech) => (
                                    <Chip
                                        key={tech}
                                        label={tech}
                                        size="medium"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '0.8125rem',
                                            height: 32,
                                            bgcolor:
                                                theme.palette.mode === 'dark'
                                                    ? alpha(theme.palette.primary.main, 0.15)
                                                    : alpha(theme.palette.primary.main, 0.08),
                                            color: 'primary.main',
                                            border:
                                                theme.palette.mode === 'dark'
                                                    ? `1px solid ${alpha(theme.palette.primary.main, 0.35)}`
                                                    : `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            backdropFilter: 'blur(8px)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                bgcolor:
                                                    theme.palette.mode === 'dark'
                                                        ? alpha(theme.palette.primary.main, 0.25)
                                                        : alpha(theme.palette.primary.main, 0.15),
                                                borderColor:
                                                    theme.palette.mode === 'dark'
                                                        ? alpha(theme.palette.primary.main, 0.6)
                                                        : alpha(theme.palette.primary.main, 0.4),
                                                transform: 'translateY(-2px)',
                                                boxShadow:
                                                    theme.palette.mode === 'dark'
                                                        ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                                                        : 'none',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        {(project.repoUrl || project.liveUrl) && (
                            <>
                                <Divider
                                    sx={{
                                        borderColor: alpha(theme.palette.divider, 0.4),
                                        my: 1,
                                    }}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                                    {project.repoUrl && (
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            startIcon={<GitHubIcon />}
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '0.9375rem',
                                                py: 1.25,
                                                px: 3,
                                                borderRadius: 2,
                                                borderWidth: 1.5,
                                                textTransform: 'none',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderWidth: 1.5,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                                },
                                            }}
                                        >
                                            View Code
                                        </Button>
                                    )}
                                    {project.liveUrl && (
                                        <Button
                                            variant="contained"
                                            size="large"
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            startIcon={<LaunchIcon />}
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '0.9375rem',
                                                py: 1.25,
                                                px: 3,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 8px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                                                },
                                            }}
                                        >
                                            View Live
                                        </Button>
                                    )}
                                </Stack>
                            </>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
