'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import { EmptyState } from '@/components/ui/EmptyState';

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
            className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
        >
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="space-y-4 text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                        Galeria Completa
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore todos os projetos organizados por tecnologia e contexto
                    </p>
                </div>

                {/* Filters */}
                <div className="space-y-6 mb-12">
                    {/* Search Input */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar projetos por nome, descrição ou tecnologia..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-10 h-12 text-base"
                                aria-label="Search projects"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Clear search"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Technology Filter */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                Filtrar por Tecnologia
                            </h3>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-8"
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Limpar Filtros
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
                <div className="mb-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Exibindo{' '}
                        <span className="font-semibold text-foreground">
                            {filteredProjects.length}
                        </span>{' '}
                        de{' '}
                        <span className="font-semibold text-foreground">
                            {projects.length}
                        </span>{' '}
                        {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
                    </p>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <EmptyState
                            message={
                                hasActiveFilters
                                    ? 'Nenhum projeto encontrado com os filtros aplicados'
                                    : 'Nenhum projeto disponível'
                            }
                        />
                        {hasActiveFilters && (
                            <div className="mt-6">
                                <Button onClick={clearFilters} variant="outline">
                                    Limpar Filtros
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                    {project.context && (
                                        <CardDescription>{project.context}</CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <TechBadge
                                                key={tech}
                                                technology={tech}
                                                active={selectedTech === tech}
                                                onClick={() => handleTechClick(tech)}
                                            />
                                        ))}
                                    </div>

                                    {/* Links */}
                                    {(project.repoUrl || project.liveUrl) && (
                                        <div className="flex gap-2 pt-2">
                                            {project.repoUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    className="flex-1"
                                                >
                                                    <a
                                                        href={project.repoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Code
                                                    </a>
                                                </Button>
                                            )}
                                            {project.liveUrl && (
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    asChild
                                                    className="flex-1"
                                                >
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Live
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
