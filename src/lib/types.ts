export type ProjectStatus = 'completed' | 'in-progress' | 'to-do';

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
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Technology {
    name: string;
    count: number;
    slug: string;
}

export interface Category {
    name: string;
    count: number;
    slug: string;
}

export type ProjectCategory =
    | 'web-app'
    | 'cli-tool'
    | 'api'
    | 'library'
    | 'dashboard'
    | 'cms'
    | 'other';

export type ThemeType = 'light' | 'dark' | 'system';

export interface FilterState {
    search: string;
    technology: string | null;
    category: string | null;
}
