'use client';

import * as React from 'react';
import { Card, CardContent, Button, Link, Box, Typography, Divider } from '@mui/material';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { ExternalLink, Github } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';

interface FeaturedProjectsCarouselProps {
    projects: Project[];
}

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const featuredProjects = projects.filter((p) => p.featured);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <Box
            component="section"
            id="featured"
            sx={{ py: 16 }}
            className="bg-[var(--bg-surface)]/30"
        >
            <Box className="page-container">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="overline"
                        sx={{ fontWeight: 600, letterSpacing: '0.08em' }}
                        className="text-[var(--accent-primary)]"
                    >
                        Portfolio Highlights
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: { xs: '2.5rem', lg: '3rem' }, fontWeight: 600, letterSpacing: '-0.02em' }}
                        className="text-[var(--text-primary)]"
                    >
                        Featured Projects
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 896, mx: 'auto' }} className="text-[var(--text-secondary)]">
                        Selected work showcasing technical excellence and attention to detail
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    <Carousel
                        setApi={setApi}
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {featuredProjects.map((project) => (
                                <CarouselItem key={project.id}>
                                    <Card
                                        elevation={0}
                                        sx={{ border: '1px solid', backdropFilter: 'blur(8px)' }}
                                        className="border-[var(--border-default)] bg-[var(--bg-surface)]/50"
                                    >
                                        <CardContent sx={{ p: { xs: 4, lg: 6 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3 }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ fontSize: { xs: '1.5rem', lg: '1.875rem' }, fontWeight: 600, letterSpacing: '-0.02em' }}
                                                        >
                                                            {project.title}
                                                        </Typography>
                                                        {project.context && (
                                                            <Typography variant="body2" sx={{ fontWeight: 500 }} className="text-[var(--text-secondary)]">
                                                                {project.context}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Typography variant="body1" sx={{ lineHeight: 1.6 }} className="text-[var(--text-secondary)]">
                                                    {project.description}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                <Typography
                                                    variant="overline"
                                                    sx={{ fontWeight: 600, letterSpacing: '0.08em' }}
                                                    className="text-[var(--text-secondary)]"
                                                >
                                                    Technology Stack
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                    {project.technologies.map((tech) => (
                                                        <TechBadge key={tech} technology={tech} />
                                                    ))}
                                                </Box>
                                            </Box>

                                            {(project.repoUrl || project.liveUrl) && (
                                                <>
                                                    <Divider className="border-[var(--border-default)]" />
                                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                                        {project.repoUrl && (
                                                            <Button
                                                                variant="outlined"
                                                                size="medium"
                                                                component={Link}
                                                                href={project.repoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                startIcon={<Github className="h-4 w-4" />}
                                                                sx={{ fontWeight: 500 }}
                                                            >
                                                                View Code
                                                            </Button>
                                                        )}
                                                        {project.liveUrl && (
                                                            <Button
                                                                variant="outlined"
                                                                size="medium"
                                                                component={Link}
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                startIcon={<ExternalLink className="h-4 w-4" />}
                                                                sx={{ fontWeight: 500 }}
                                                            >
                                                                View Live
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 4 }}>
                        {Array.from({ length: count }).map((_, index) => (
                            <Box
                                component="button"
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                sx={{
                                    height: '6px',
                                    borderRadius: '9999px',
                                    transition: 'all 0.2s',
                                    width: index + 1 === current ? '32px' : '6px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    padding: 0,
                                    '&:hover': {
                                        opacity: 0.8,
                                    },
                                }}
                                className={
                                    index + 1 === current
                                        ? 'bg-[var(--accent-primary)]'
                                        : 'bg-[var(--border-default)] hover:bg-[var(--text-muted)]'
                                }
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
