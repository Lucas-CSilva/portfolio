export const APP_CONFIG = {
    name: 'Portfolio',
    description: 'Professional portfolio showcasing projects and skills',
    author: 'Lucas Silva',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: '1.0.0',
} as const;

export const ROUTES = {
    home: '/',
    projects: '/projects',
    projectDetail: (id: string) => `/projects/${id}`,
    about: '/#about',
} as const;

export const PROJECT_STATUSES = {
    completed: { label: 'Completed', color: 'success' },
    'in-progress': { label: 'In Progress', color: 'warning' },
    'to-do': { label: 'To Do', color: 'info' },
} as const;

export const PAGINATION = {
    defaultPageSize: 12,
    pageSizeOptions: [6, 12, 24, 48],
} as const;

export const THEME = {
    defaultTheme: 'system',
    storageKey: 'portfolio-theme',
} as const;
