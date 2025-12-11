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
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Project } from '@/lib/types';

interface FeaturedProjectsCarouselProps {
    projects: Project[];
}

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const autoplayPlugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            align: 'center',
            skipSnaps: false,
        },
        [autoplayPlugin.current]
    );

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = React.useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const featuredProjects = projects.filter((p) => p.featured);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <Box
            component="section"
            id="featured"
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
            <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
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
                                disabled={!canScrollPrev}
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
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
                                disabled={!canScrollNext}
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
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

                    <Box 
                        ref={emblaRef} 
                        sx={{ 
                            overflow: 'visible',
                            borderRadius: 3,
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
                            {featuredProjects.map((project, index) => (
                                <Box
                                    key={project.id}
                                    sx={{
                                        flex: '0 0 100%',
                                        minWidth: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        py: { xs: 1, md: 2 },
                                    }}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            width: '100%',
                                            maxWidth: { xs: '100%', md: 900, lg: 1000 },
                                            background: theme.palette.mode === 'dark'
                                                ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.75)} 100%)`
                                                : '#ffffff',
                                            backdropFilter: 'blur(20px)',
                                            border: selectedIndex === index 
                                                ? theme.palette.mode === 'dark'
                                                    ? `1px solid ${alpha(theme.palette.primary.main, 0.6)}`
                                                    : `1px solid ${alpha(theme.palette.primary.main, 0.4)}`
                                                : theme.palette.mode === 'dark'
                                                    ? `1px solid ${alpha(theme.palette.divider, 0.3)}`
                                                    : `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                                            borderRadius: 3,
                                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transform: selectedIndex === index 
                                                ? 'translateY(-4px) scale(1.01)' 
                                                : 'translateY(0) scale(1)',
                                            boxShadow: selectedIndex === index
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
                                                opacity: selectedIndex === index ? 1 : 0,
                                                transition: 'opacity 0.4s ease',
                                            },
                                            '&:hover': {
                                                transform: 'translateY(-4px) scale(1.01)',
                                                boxShadow: theme.palette.mode === 'dark'
                                                    ? `0 20px 60px ${alpha(theme.palette.common.black, 0.7)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.15)}`
                                                    : `0 20px 60px ${alpha(theme.palette.common.black, 0.2)}`,
                                                border: theme.palette.mode === 'dark'
                                                    ? `1px solid ${alpha(theme.palette.primary.main, 0.6)}`
                                                    : `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                                                '&::before': {
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                        >
                                            <CardContent 
                                                sx={{ 
                                                    p: { xs: 3, sm: 4, md: 5, lg: 6 },
                                                    minHeight: { md: 450, lg: 500 },
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Stack spacing={{ xs: 3, md: 3.5 }} sx={{ flex: 1 }}>
                                                    {/* Project Header */}
                                                    <Stack spacing={1.5}>
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
                                                    </Stack>                                                    {/* Technology Stack */}
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
                            ))}
                        </Box>
                    </Box>

                    <Stack 
                        direction="row" 
                        spacing={1.5} 
                        justifyContent="center" 
                        alignItems="center"
                        sx={{ mt: { xs: 4, md: 5 } }}
                    >
                        {scrollSnaps.map((_, index) => (
                            <Box
                                key={index}
                                component="button"
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                sx={{
                                    width: selectedIndex === index ? 40 : 10,
                                    height: 10,
                                    borderRadius: 10,
                                    border: 'none',
                                    p: 0,
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    bgcolor: selectedIndex === index
                                        ? 'primary.main'
                                        : alpha(theme.palette.text.secondary, 0.25),
                                    boxShadow: selectedIndex === index
                                        ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                                        : 'none',
                                    '&:hover': {
                                        bgcolor: selectedIndex === index
                                            ? 'primary.main'
                                            : alpha(theme.palette.text.secondary, 0.4),
                                        transform: 'scale(1.1)',
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
