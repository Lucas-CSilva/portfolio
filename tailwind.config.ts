import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                app: {
                    bg: 'var(--bg-app)',
                    surface: 'var(--bg-surface)',
                    elevated: 'var(--bg-elevated)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    muted: 'var(--text-muted)',
                },
                accent: {
                    primary: 'var(--accent-primary)',
                    hover: 'var(--accent-hover)',
                },
                border: {
                    default: 'var(--border-default)',
                },
            },
        },
    },
    plugins: [],
};

export default config;
