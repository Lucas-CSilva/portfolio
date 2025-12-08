import type { Project } from './types';

/**
 * Filter projects by technology slug
 */
export function filterProjects(
    projects: Project[],
    technologySlug: string | null
): Project[] {
    if (!technologySlug) {
        return projects;
    }

    return projects.filter((project) =>
        project.technologies.some(
            (tech) => tech.toLowerCase().replace(/[^a-z0-9]+/g, '-') === technologySlug
        )
    );
}
