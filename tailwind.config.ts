import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
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
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        background: 'var(--bg-app)',
                        foreground: 'var(--text-primary)',
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: 'var(--accent-primary)',
                        },
                    },
                },
                dark: {
                    colors: {
                        background: 'var(--bg-app)',
                        foreground: 'var(--text-primary)',
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: 'var(--accent-primary)',
                        },
                    },
                },
            },
        }),
    ],
};

export default config;
