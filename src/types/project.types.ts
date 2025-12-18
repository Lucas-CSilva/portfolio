export type ProjectStatus = 'completed' | 'in-progress' | 'to-do';

export type ProjectCategory =
    | 'web-app'
    | 'cli-tool'
    | 'api'
    | 'library'
    | 'dashboard'
    | 'cms'
    | 'other';

export interface Project {
    id: string;
    title: string;
    summary: string;
    description: string;
    status: ProjectStatus;
    technologies: string[];
    category?: ProjectCategory;
    context?: string;
    image?: string;
    blurDataURL?: string;
    liveUrl?: string;
    repoUrl?: string;
    order: number;
    featured?: boolean;
    images?: string[];
}

export interface ProjectFilterOptions {
    search?: string;
    technology?: string | null;
    category?: string | null;
    status?: ProjectStatus | null;
    featured?: boolean;
}

export interface ProjectListResponse {
    projects: Project[];
    total: number;
    filtered: number;
}
