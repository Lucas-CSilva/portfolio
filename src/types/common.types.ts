export type ThemeType = 'light' | 'dark' | 'system';

export interface FilterState {
    search: string;
    technology: string | null;
    category: string | null;
}

export interface Category {
    name: string;
    count: number;
    slug: string;
}
