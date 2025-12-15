'use client';

import * as React from 'react';
import { 
    Card, 
    CardContent, 
    Button, 
    Box, 
    Typography, 
    Divider, 
    IconButton,
    Chip,
    Stack,
    useTheme,
    useMediaQuery,
    alpha
} from '@mui/material';
import { 
    GitHub as GitHubIcon, 
    Launch as LaunchIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/types';
import { StatusBadge } from '../projects/StatusBadge';

interface FeaturedProjectsCarouselProps {
    projects: Project[];
}

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const autoplayTimeoutRef = React.useRef<NodeJS.Timeout>();

    const featuredProjects = projects.filter((p) => p.featured);

    const handleProjectClick = (project: Project) => {
        router.push(`/projects/${project.id}`);
    };

    const scrollNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const scrollPrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const scrollTo = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Autoplay
    React.useEffect(() => {
        autoplayTimeoutRef.current = setTimeout(() => {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
            setTimeout(() => setIsAnimating(false), 500);
        }, 6000);

        return () => {
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current);
            }
        };
    }, [currentIndex, featuredProjects.length]);

    // Função para calcular a posição de cada card na lista circular
    const getCardPosition = (index: number) => {
        const total = featuredProjects.length;
        let position = index - currentIndex;
        
        // Normaliza a posição para estar entre -total/2 e total/2
        if (position > total / 2) position -= total;
        if (position < -total / 2) position += total;
        
        return position;
    };

    // Função para obter o estilo de cada card baseado na posição
    const getCardStyle = (position: number) => {
        const isCurrent = position === 0;
        const isAdjacent = Math.abs(position) === 1;
        const isVisible = Math.abs(position) <= 1;

        if (!isVisible) {
            return {
                opacity: 0,
                transform: `translateX(${position * 100}%) scale(0.7)`,
                zIndex: 0,
                pointerEvents: 'none' as const,
            };
        }

        if (isCurrent) {
            return {
                opacity: 1,
                transform: 'translateX(0) scale(1)',
                zIndex: 10,
                pointerEvents: 'auto' as const,
            };
        }

        if (isAdjacent) {
            const direction = position > 0 ? 1 : -1;
            return {
                opacity: 0.4,
                transform: `translateX(${direction * 75}%) scale(0.85)`,
                zIndex: 5,
                pointerEvents: 'none' as const,
            };
        }

        return {
            opacity: 0,
            transform: `translateX(${position * 100}%) scale(0.7)`,
            zIndex: 0,
            pointerEvents: 'none' as const,
        };
    };

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12, lg: 16 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    height: '90%',
                    background: theme.palette.mode === 'dark'
                        ? `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 40%, transparent 70%)`
                        : `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <Box id="featured" sx={{ position: 'relative', zIndex: 1, maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
                <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
                    <Typography
                        variant="overline"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            color: 'primary.main',
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                        }}
                    >
                        Portfolio Highlights
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`
                                : `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.dark} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Featured Projects
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            maxWidth: 600, 
                            color: 'text.secondary',
                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                            lineHeight: 1.7,
                        }}
                    >
                        Selected work showcasing technical excellence and attention to detail
                    </Typography>
                </Stack>

                <Box sx={{ position: 'relative', px: { md: 8, lg: 10 }, py: { xs: 2, md: 3 } }}>
                    {!isMobile && (
                        <>
                            <IconButton
                                onClick={scrollPrev}
                                disabled={isAnimating}
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 20,
                                    width: 56,
                                    height: 56,
                                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                                    backdropFilter: 'blur(12px)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.background.paper, 0.95),
                                        transform: 'translateY(-50%) translateX(-4px)',
                                        boxShadow: `0 12px 48px ${alpha(theme.palette.common.black, 0.15)}`,
                                    },
                                    '&:disabled': {
                                        opacity: 0.3,
                                    },
                                }}
                            >
                                <ChevronLeftIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                            <IconButton
                                onClick={scrollNext}
                                disabled={isAnimating}
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 20,
                                    width: 56,
                                    height: 56,
                                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                                    backdropFilter: 'blur(12px)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.background.paper, 0.95),
                                        transform: 'translateY(-50%) translateX(4px)',
                                        boxShadow: `0 12px 48px ${alpha(theme.palette.common.black, 0.15)}`,
                                    },
                                    '&:disabled': {
                                        opacity: 0.3,
                                    },
                                }}
                            >
                                <ChevronRightIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                        </>
                    )}

                    {/* Container do Carousel Circular */}
                    <Box 
                        sx={{ 
                            position: 'relative',
                            width: '100%',
                            minHeight: { xs: 500, md: 550 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {featuredProjects.map((project, index) => {
                            const position = getCardPosition(index);
                            const cardStyle = getCardStyle(position);
                            const isCurrent = position === 0;

                            return (
                                <Box
                                    key={project.id}
                                    onClick={() => isCurrent && handleProjectClick(project)}
                                    onKeyDown={(e) => {
                                        if (isCurrent && (e.key === 'Enter' || e.key === ' ')) {
                                            e.preventDefault();
                                            handleProjectClick(project);
                                        }
                                    }}
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
                                        '&:focus-visible': isCurrent ? {
                                            outline: `2px solid ${theme.palette.primary.main}`,
                                            outlineOffset: 4,
                                            borderRadius: 3,
                                        } : {},
                                    }}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            width: '100%',
                                            background: theme.palette.mode === 'dark'
                                                ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.75)} 100%)`
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
                                                    ? `0 20px 60px ${alpha(theme.palette.common.black, 0.7)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.15)}`
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
                                                                    bgcolor: theme.palette.mode === 'dark'
                                                                        ? alpha(theme.palette.primary.main, 0.15)
                                                                        : alpha(theme.palette.primary.main, 0.08),
                                                                    color: 'primary.main',
                                                                    border: theme.palette.mode === 'dark'
                                                                        ? `1px solid ${alpha(theme.palette.primary.main, 0.35)}`
                                                                        : `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                                                    backdropFilter: 'blur(8px)',
                                                                    transition: 'all 0.3s ease',
                                                                    '&:hover': {
                                                                        bgcolor: theme.palette.mode === 'dark'
                                                                            ? alpha(theme.palette.primary.main, 0.25)
                                                                            : alpha(theme.palette.primary.main, 0.15),
                                                                        borderColor: theme.palette.mode === 'dark'
                                                                            ? alpha(theme.palette.primary.main, 0.6)
                                                                            : alpha(theme.palette.primary.main, 0.4),
                                                                        transform: 'translateY(-2px)',
                                                                        boxShadow: theme.palette.mode === 'dark'
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
                                                        <Stack 
                                                            direction={{ xs: 'column', sm: 'row' }}
                                                            spacing={1.5}
                                                        >
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
                        })}
                    </Box>

                    {/* Indicadores de navegação */}
                    <Stack 
                        direction="row" 
                        spacing={1.5} 
                        justifyContent="center" 
                        alignItems="center"
                        sx={{ mt: { xs: 4, md: 5 } }}
                    >
                        {featuredProjects.map((_, index) => (
                            <Box
                                key={index}
                                component="button"
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                disabled={isAnimating}
                                sx={{
                                    width: currentIndex === index ? 40 : 10,
                                    height: 10,
                                    borderRadius: 10,
                                    border: 'none',
                                    p: 0,
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    bgcolor: currentIndex === index
                                        ? 'primary.main'
                                        : alpha(theme.palette.text.secondary, 0.25),
                                    boxShadow: currentIndex === index
                                        ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                                        : 'none',
                                    '&:hover': {
                                        bgcolor: currentIndex === index
                                            ? 'primary.main'
                                            : alpha(theme.palette.text.secondary, 0.4),
                                        transform: 'scale(1.1)',
                                    },
                                    '&:disabled': {
                                        cursor: 'not-allowed',
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}