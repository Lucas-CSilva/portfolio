import type { Project, Technology } from './types';

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
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }))
        .sort((a, b) => b.count - a.count);
}

export function getTechnologySlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
