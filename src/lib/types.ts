export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    category?: ProjectCategory;
    context?: string;
    image?: string;
    blurDataURL?: string;
    liveUrl?: string;
    repoUrl?: string;
    order: number;
    featured?: boolean;
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
