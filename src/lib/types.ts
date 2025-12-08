/**
 * Shared TypeScript types for Nord Portfolio SPA
 * Based on contracts/types.ts
 */

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
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

export type ThemeType = 'light' | 'dark' | 'system';
