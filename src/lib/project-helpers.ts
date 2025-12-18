/**
 * Helper functions for project-related operations
 * These provide convenience methods wrapping service/repository calls
 */

import { projectRepository } from '@/repositories';
import type { Project, Technology, Category, ProjectStatus } from '@/types';
import { slugify } from '@/utils';
import { PROJECT_STATUSES } from '@/config';

/**
 * Get technologies with count from projects
 */
export function getTechnologies(projects: Project[]): Technology[] {
    const techMap = new Map<string, number>();

    projects.forEach((project) => {
        project.technologies.forEach((tech) => {
            techMap.set(tech, (techMap.get(tech) || 0) + 1);
        });
    });

    return Array.from(techMap.entries())
        .map(([name, count]) => ({
            name,
            count,
            slug: slugify(name),
        }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get categories with count from projects
 */
export function getCategories(projects: Project[]): Category[] {
    const categoryMap = new Map<string, number>();

    projects.forEach((project) => {
        if (project.context) {
            categoryMap.set(project.context, (categoryMap.get(project.context) || 0) + 1);
        }
    });

    return Array.from(categoryMap.entries())
        .map(([name, count]) => ({
            name,
            count,
            slug: slugify(name),
        }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get status label for a project status
 */
export function getStatusLabel(status: ProjectStatus): string {
    return PROJECT_STATUSES[status]?.label || status;
}

/**
 * Find a project by ID
 */
export function findProjectById(projects: Project[], id: string): Project | undefined {
    return projects.find((project) => project.id === id);
}

/**
 * Get all projects (convenience wrapper)
 */
export function getAllProjects(): Project[] {
    return projectRepository.getAll();
}

/**
 * Filter projects
 */
export function filterProjects(
    projects: Project[],
    filters: {
        search?: string | null;
        technology?: string | null;
        category?: string | null;
    }
): Project[] {
    let filtered = projects;

    if (filters.search && filters.search.trim()) {
        const searchLower = filters.search.toLowerCase().trim();
        filtered = filtered.filter(
            (project) =>
                project.title.toLowerCase().includes(searchLower) ||
                project.summary.toLowerCase().includes(searchLower) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        );
    }

    if (filters.technology) {
        filtered = filtered.filter((project) =>
            project.technologies.some(
                (tech) => slugify(tech) === filters.technology
            )
        );
    }

    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter((project) => {
            if (!project.context) return false;
            return slugify(project.context) === filters.category;
        });
    }

    return filtered;
}
