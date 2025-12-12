'use client';

import { Box, Typography, useTheme, alpha, Stack } from '@mui/material';
import type { Project } from '@/lib/types';
import { FilterControls } from '@/components/projects/FilterControls';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { getTechnologies } from '@/lib/technologies';
import { getCategories } from '@/lib/projects';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';
import { useMemo } from 'react';

interface ProjectGallerySectionProps {
    projects: Project[];
}

export function ProjectGallerySection({ projects }: ProjectGallerySectionProps) {
    const theme = useTheme();
    const { search, activeTech, activeCategory } = useProjectFilter();

    const technologies = getTechnologies(projects);
    const categories = getCategories(projects);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                !search ||
                project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.description.toLowerCase().includes(search.toLowerCase()) ||
                project.technologies.some((tech) =>
                    tech.toLowerCase().includes(search.toLowerCase())
                );

            const matchesTech =
                !activeTech || project.technologies.some(tech =>
                    tech.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeTech
                );

            const matchesCategory =
                !activeCategory ||
                (project.context && project.context.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeCategory);

            return matchesSearch && matchesTech && matchesCategory;
        });
    }, [projects, search, activeTech, activeCategory]);

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
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '60%',
                    background: theme.palette.mode === 'dark'
                        ? `radial-gradient(ellipse at center, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 60%)`
                        : `radial-gradient(ellipse at center, ${alpha(theme.palette.secondary.light, 0.06)} 0%, transparent 50%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <Box id="gallery" sx={{ position: 'relative', zIndex: 1, maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
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
                        Complete Portfolio
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
                        All Projects
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            maxWidth: 896,
                            mx: 'auto',
                            color: 'text.secondary',
                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                            lineHeight: 1.7,
                        }}
                    >
                        Browse the complete collection, filter by technology
                    </Typography>
                </Stack>

                <Box sx={{ mb: { xs: 6, md: 8 } }}>
                    <FilterControls
                        technologies={technologies}
                        categories={categories}
                        totalProjects={projects.length}
                        filteredCount={filteredProjects.length}
                    />
                </Box>

                <ProjectGallery projects={filteredProjects} />
            </Box>
        </Box>
    );
}