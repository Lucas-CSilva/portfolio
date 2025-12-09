'use client';

import * as React from 'react';
import { Input, Button } from '@heroui/react';
import { Search, X } from 'lucide-react';
import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ProjectGallerySectionProps {
    projects: Project[];
}

export function ProjectGallerySection({ projects }: ProjectGallerySectionProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedTech, setSelectedTech] = React.useState<string | null>(null);

    // Extract unique technologies
    const allTechnologies = React.useMemo(() => {
        const techSet = new Set<string>();
        projects.forEach((project) => {
            project.technologies.forEach((tech) => techSet.add(tech));
        });
        return Array.from(techSet).sort();
    }, [projects]);

    // Filter projects
    const filteredProjects = React.useMemo(() => {
        return projects.filter((project) => {
            // Search filter
            const matchesSearch =
                !searchQuery ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.technologies.some((tech) =>
                    tech.toLowerCase().includes(searchQuery.toLowerCase())
                );

            // Technology filter
            const matchesTech =
                !selectedTech || project.technologies.includes(selectedTech);

            return matchesSearch && matchesTech;
        });
    }, [projects, searchQuery, selectedTech]);

    const handleTechClick = (tech: string) => {
        setSelectedTech(selectedTech === tech ? null : tech);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTech(null);
    };

    const hasActiveFilters = searchQuery || selectedTech;

    return (
        <section
            id="gallery"
            className="py-32"
        >
            <div className="page-container">
                {/* Header */}
                <div className="space-y-3 text-center mb-16">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                        Complete Portfolio
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                        All Projects
                    </h2>
                    <p className="text-base text-default-500 max-w-2xl mx-auto">
                        Browse the complete collection, filter by technology
                    </p>
                </div>

                {/* Filters */}
                <div className="space-y-8 mb-12">
                    {/* Search Input */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-default-400" />
                            <Input
                                type="search"
                                placeholder="Search by name, description, or technology..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                classNames={{
                                    base: "max-w-full",
                                    inputWrapper: "h-12 bg-default-50 border border-divider hover:border-default-400 transition-colors",
                                    input: "pl-10 text-sm",
                                }}
                                aria-label="Search projects"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-default-400 hover:text-default-600 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Technology Filter */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-default-500">
                                Filter by Technology
                            </h3>
                            {hasActiveFilters && (
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={clearFilters}
                                    startContent={<X className="h-3.5 w-3.5" />}
                                    className="h-8 text-xs font-medium"
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {allTechnologies.map((tech) => (
                                <TechBadge
                                    key={tech}
                                    technology={tech}
                                    active={selectedTech === tech}
                                    onClick={() => handleTechClick(tech)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-8 text-center">
                    <p className="text-sm text-default-500">
                        Showing{' '}
                        <span className="font-semibold text-foreground">
                            {filteredProjects.length}
                        </span>{' '}
                        of{' '}
                        <span className="font-semibold text-foreground">
                            {projects.length}
                        </span>{' '}
                        {filteredProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-16">
                        <EmptyState
                            message={
                                hasActiveFilters
                                    ? 'No projects match the selected filters'
                                    : 'No projects available'
                            }
                        />
                        {hasActiveFilters && (
                            <div className="mt-6">
                                <Button 
                                    onClick={clearFilters} 
                                    variant="bordered"
                                    size="md"
                                    className="font-medium"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
