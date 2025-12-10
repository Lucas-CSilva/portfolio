'use client';

import { Box, Typography } from '@mui/material';
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
            id="gallery"
            sx={{ py: 16 }}
        >
            <Box className="page-container">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="overline"
                        sx={{ fontWeight: 600, letterSpacing: '0.08em' }}
                        className="text-[var(--accent-primary)]"
                    >
                        Complete Portfolio
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: { xs: '2.5rem', lg: '3rem' }, fontWeight: 600, letterSpacing: '-0.02em' }}
                        className="text-[var(--text-primary)]"
                    >
                        All Projects
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 896, mx: 'auto' }} className="text-[var(--text-secondary)]">
                        Browse the complete collection, filter by technology
                    </Typography>
                </Box>

                <Box sx={{ mb: 6 }}>
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
