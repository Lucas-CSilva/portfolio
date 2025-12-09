import type { Project, Category } from './types';

/**
 * Filter projects by multiple criteria: search text, technology slug, and category slug
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

    // Filter by search text (case-insensitive, searches title and description)
    if (filters.search && filters.search.trim()) {
        const searchLower = filters.search.toLowerCase().trim();
        filtered = filtered.filter(
            (project) =>
                project.title.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        );
    }

    // Filter by technology slug
    if (filters.technology) {
        filtered = filtered.filter((project) =>
            project.technologies.some(
                (tech) => tech.toLowerCase().replace(/[^a-z0-9]+/g, '-') === filters.technology
            )
        );
    }

    // Filter by category slug
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter((project) => {
            if (!project.context) return false;
            const categorySlug = project.context.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return categorySlug === filters.category;
        });
    }

    return filtered;
}

/**
 * Extract unique categories from projects with counts
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
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }))
        .sort((a, b) => b.count - a.count); // Sort by count descending
}
