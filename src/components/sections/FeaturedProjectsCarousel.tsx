'use client';

import { Box, useTheme, useMediaQuery, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/types';
import { useCarousel } from './carousel/useCarousel';
import { CarouselHeader } from './carousel/CarouselHeader';
import { CarouselCard } from './carousel/CarouselCard';
import { CarouselNavigation } from './carousel/CarouselNavigation';
import { CarouselIndicators } from './carousel/CarouselIndicators';

interface FeaturedProjectsCarouselProps {
    projects: Project[];
}

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const featuredProjects = projects.filter((p) => p.featured);

    const { currentIndex, isAnimating, scrollNext, scrollPrev, scrollTo, getCardPosition } = useCarousel({
        itemCount: featuredProjects.length,
        autoplayDelay: 6000,
        animationDuration: 500,
    });

    const handleProjectClick = (project: Project) => {
        router.push(`/projects/${project.id}`);
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
                    background:
                        theme.palette.mode === 'dark'
                            ? `radial-gradient(ellipse at center, ${alpha(
                                  theme.palette.primary.main,
                                  0.12
                              )} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 40%, transparent 70%)`
                            : `radial-gradient(ellipse at center, ${alpha(
                                  theme.palette.primary.light,
                                  0.08
                              )} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <Box id="featured" sx={{ position: 'relative', zIndex: 1, maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
                <CarouselHeader
                    title="Featured Projects"
                    description="Selected work showcasing technical excellence and attention to detail"
                />

                <Box sx={{ position: 'relative', px: { md: 8, lg: 10 }, py: { xs: 2, md: 3 } }}>
                    {!isMobile && <CarouselNavigation onPrevious={scrollPrev} onNext={scrollNext} disabled={isAnimating} />}

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

                            return (
                                <CarouselCard
                                    key={project.id}
                                    project={project}
                                    position={position}
                                    onClick={() => handleProjectClick(project)}
                                />
                            );
                        })}
                    </Box>

                    <CarouselIndicators
                        count={featuredProjects.length}
                        currentIndex={currentIndex}
                        onIndicatorClick={scrollTo}
                        disabled={isAnimating}
                    />
                </Box>
            </Box>
        </Box>
    );
}