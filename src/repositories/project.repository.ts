import type { Project, ProjectFilterOptions } from '@/types';
import { projectsData } from './data/projects.data';

export class ProjectRepository {
    private projects: Project[];

    constructor() {
        this.projects = projectsData;
    }

    getAll(): Project[] {
        return [...this.projects].sort((a, b) => a.order - b.order);
    }

    getById(id: string): Project | undefined {
        return this.projects.find((project) => project.id === id);
    }

    getFeatured(): Project[] {
        return this.projects
            .filter((project) => project.featured)
            .sort((a, b) => a.order - b.order);
    }

    filter(options: ProjectFilterOptions): Project[] {
        let filtered = this.getAll();

        if (options.search) {
            const searchLower = options.search.toLowerCase();
            filtered = filtered.filter(
                (project) =>
                    project.title.toLowerCase().includes(searchLower) ||
                    project.summary.toLowerCase().includes(searchLower) ||
                    project.description.toLowerCase().includes(searchLower) ||
                    project.technologies.some((tech) =>
                        tech.toLowerCase().includes(searchLower)
                    )
            );
        }

        if (options.technology) {
            filtered = filtered.filter((project) =>
                project.technologies
                    .map((t) => t.toLowerCase())
                    .includes(options.technology!.toLowerCase())
            );
        }

        if (options.category) {
            filtered = filtered.filter(
                (project) => project.category === options.category
            );
        }

        if (options.status) {
            filtered = filtered.filter((project) => project.status === options.status);
        }

        if (options.featured !== undefined) {
            filtered = filtered.filter((project) => project.featured === options.featured);
        }

        return filtered;
    }

    getAllTechnologies(): string[] {
        const techSet = new Set<string>();
        this.projects.forEach((project) => {
            project.technologies.forEach((tech) => techSet.add(tech));
        });
        return Array.from(techSet).sort();
    }

    count(): number {
        return this.projects.length;
    }
}

export const projectRepository = new ProjectRepository();
