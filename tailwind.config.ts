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
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
                'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
                'base': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.011em' }],
                'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.014em' }],
                'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
                '2xl': ['1.563rem', { lineHeight: '1.4', letterSpacing: '-0.019em' }],
                '3xl': ['1.953rem', { lineHeight: '1.3', letterSpacing: '-0.021em' }],
                '4xl': ['2.441rem', { lineHeight: '1.2', letterSpacing: '-0.022em' }],
                '5xl': ['3.052rem', { lineHeight: '1.15', letterSpacing: '-0.022em' }],
                '6xl': ['3.815rem', { lineHeight: '1.1', letterSpacing: '-0.022em' }],
            },
            spacing: {
                // 8px grid system for professional layouts
                '18': '4.5rem',   // 72px
                '22': '5.5rem',   // 88px
                '26': '6.5rem',   // 104px
                '30': '7.5rem',   // 120px
                '34': '8.5rem',   // 136px
            },
            borderRadius: {
                'sm': '0.25rem',  // 4px
                'DEFAULT': '0.375rem', // 6px
                'md': '0.5rem',   // 8px
                'lg': '0.625rem', // 10px
                'xl': '0.75rem',  // 12px
            },
            transitionDuration: {
                'DEFAULT': '200ms',
            },
            transitionTimingFunction: {
                'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
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
                        divider: 'var(--border-default)',
                        primary: {
                            foreground: '#2E3440',
                            DEFAULT: 'var(--accent-primary)',
                        },
                        default: {
                            50: '#ECEFF4',
                            100: '#E5E9F0',
                            200: '#D8DEE9',
                            300: '#C5CCD8',
                            400: '#8D95A8',
                            500: '#4C566A',
                            600: '#434C5E',
                            700: '#3B4252',
                            800: '#2E3440',
                            900: '#1A1F2C',
                            foreground: '#2E3440',
                            DEFAULT: '#D8DEE9',
                        },
                    },
                },
                dark: {
                    colors: {
                        background: 'var(--bg-app)',
                        foreground: 'var(--text-primary)',
                        divider: 'var(--border-default)',
                        primary: {
                            foreground: '#ECEFF4',
                            DEFAULT: 'var(--accent-primary)',
                        },
                        default: {
                            50: '#1A1F2C',
                            100: '#2E3440',
                            200: '#3B4252',
                            300: '#434C5E',
                            400: '#4C566A',
                            500: '#8D95A8',
                            600: '#C5CCD8',
                            700: '#D8DEE9',
                            800: '#E5E9F0',
                            900: '#ECEFF4',
                            foreground: '#ECEFF4',
                            DEFAULT: '#3B4252',
                        },
                    },
                },
            },
            layout: {
                fontSize: {
                    tiny: '0.75rem',
                    small: '0.875rem',
                    medium: '1rem',
                    large: '1.125rem',
                },
                lineHeight: {
                    tiny: '1.5',
                    small: '1.5',
                    medium: '1.6',
                    large: '1.6',
                },
                radius: {
                    small: '0.25rem',
                    medium: '0.375rem',
                    large: '0.5rem',
                },
                borderWidth: {
                    small: '1px',
                    medium: '1px',
                    large: '2px',
                },
            },
        }),
    ],
};

export default config;
