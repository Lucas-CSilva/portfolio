import type { Project, Category, ProjectStatus } from './types';

export function getStatusLabel(status: ProjectStatus): string {
    const labels: Record<ProjectStatus, string> = {
        'completed': 'Completed',
        'in-progress': 'In Progress',
        'to-do': 'To Do',
    };
    return labels[status];
}

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
                project.description.toLowerCase().includes(searchLower) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        );
    }

    if (filters.technology) {
        filtered = filtered.filter((project) =>
            project.technologies.some(
                (tech) => tech.toLowerCase().replace(/[^a-z0-9]+/g, '-') === filters.technology
            )
        );
    }

    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter((project) => {
            if (!project.context) return false;
            const categorySlug = project.context.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return categorySlug === filters.category;
        });
    }

    return filtered;
}

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
        .sort((a, b) => b.count - a.count);
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}


export function validateSlugUniqueness(
    projects: Project[],
    slug: string,
    excludeId?: string
): boolean {
    return !projects.some(
        (project) =>
            generateSlug(project.title) === slug &&
            project.id !== excludeId
    );
}


export function findProjectBySlug(projects: Project[], slug: string): Project | undefined {
    return projects.find((project) => generateSlug(project.title) === slug);
}
