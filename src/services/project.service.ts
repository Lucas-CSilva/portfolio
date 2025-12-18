import type { Project, ProjectFilterOptions, ProjectListResponse } from '@/types';
import { projectRepository } from '@/repositories';

export class ProjectService {
    getProjects(filters?: ProjectFilterOptions): ProjectListResponse {
        const allProjects = projectRepository.getAll();
        const filteredProjects = filters
            ? projectRepository.filter(filters)
            : allProjects;

        return {
            projects: filteredProjects,
            total: allProjects.length,
            filtered: filteredProjects.length,
        };
    }

    getProjectById(id: string): Project | null {
        return projectRepository.getById(id) || null;
    }

    getFeaturedProjects(limit?: number): Project[] {
        const featured = projectRepository.getFeatured();
        return limit ? featured.slice(0, limit) : featured;
    }

    getAllTechnologies(): string[] {
        return projectRepository.getAllTechnologies();
    }

    searchProjects(query: string): Project[] {
        return projectRepository.filter({ search: query });
    }

    getProjectsByTechnology(technology: string): Project[] {
        return projectRepository.filter({ technology });
    }


    getStatistics() {
        const allProjects = projectRepository.getAll();

        return {
            total: allProjects.length,
            completed: allProjects.filter((p) => p.status === 'completed').length,
            inProgress: allProjects.filter((p) => p.status === 'in-progress').length,
            todo: allProjects.filter((p) => p.status === 'to-do').length,
            featured: allProjects.filter((p) => p.featured).length,
            technologies: this.getAllTechnologies().length,
        };
    }
}

export const projectService = new ProjectService();
