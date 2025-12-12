'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// Nord Color Palette - Single source of truth for all colors
export const nord = {
    // Polar Night - Dark colors (nord0-nord3)
    nord0: '#2e3440',
    nord1: '#3b4252',
    nord2: '#434c5e',
    nord3: '#4c566a',

    // Snow Storm - Light colors (nord4-nord6)
    nord4: '#d8dee9',
    nord5: '#e5e9f0',
    nord6: '#eceff4',

    // Frost - Blue/Cyan accents (nord7-nord10)
    nord7: '#8fbcbb',
    nord8: '#88c0d0',
    nord9: '#81a1c1',
    nord10: '#5e81ac',

    // Aurora - Colorful accents (nord11-nord15)
    nord11: '#bf616a',
    nord12: '#d08770',
    nord13: '#ebcb8b',
    nord14: '#a3be8c',
    nord15: '#b48ead',
};

// Shared theme options
const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: nord.nord10,
            light: nord.nord9,
            dark: nord.nord10,
            contrastText: mode === 'light' ? nord.nord6 : nord.nord6,
        },
        secondary: {
            main: nord.nord8,
            light: nord.nord7,
            dark: nord.nord8,
            contrastText: mode === 'light' ? nord.nord0 : nord.nord6,
        },
        error: {
            main: nord.nord11,
            light: nord.nord11,
            dark: nord.nord11,
            contrastText: nord.nord6,
        },
        warning: {
            main: nord.nord12,
            light: nord.nord12,
            dark: nord.nord12,
            contrastText: nord.nord0,
        },
        info: {
            main: nord.nord8,
            light: nord.nord7,
            dark: nord.nord8,
            contrastText: nord.nord0,
        },
        success: {
            main: nord.nord14,
            light: nord.nord14,
            dark: nord.nord14,
            contrastText: nord.nord0,
        },
        background: {
            default: mode === 'light' ? nord.nord6 : nord.nord0,
            paper: mode === 'light' ? nord.nord5 : nord.nord1,
        },
        text: {
            primary: mode === 'light' ? nord.nord0 : nord.nord6,
            secondary: mode === 'light' ? nord.nord3 : nord.nord4,
            disabled: mode === 'light' ? nord.nord2 : nord.nord3,
        },
        divider: mode === 'light' ? nord.nord4 : nord.nord2,
        action: {
            active: mode === 'light' ? nord.nord3 : nord.nord4,
            hover: mode === 'light' ? `${nord.nord4}1a` : `${nord.nord2}1a`,
            selected: mode === 'light' ? `${nord.nord4}33` : `${nord.nord2}33`,
            disabled: mode === 'light' ? nord.nord2 : nord.nord3,
            disabledBackground: mode === 'light' ? `${nord.nord4}1a` : `${nord.nord1}1a`,
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: '3.815rem',
            lineHeight: 1.1,
            letterSpacing: '-0.022em',
            fontWeight: 700,
        },
        h2: {
            fontSize: '3.052rem',
            lineHeight: 1.15,
            letterSpacing: '-0.022em',
            fontWeight: 700,
        },
        h3: {
            fontSize: '2.441rem',
            lineHeight: 1.2,
            letterSpacing: '-0.022em',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.953rem',
            lineHeight: 1.3,
            letterSpacing: '-0.021em',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.563rem',
            lineHeight: 1.4,
            letterSpacing: '-0.019em',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1.25rem',
            lineHeight: 1.5,
            letterSpacing: '-0.017em',
            fontWeight: 600,
        },
        subtitle1: {
            fontSize: '1.125rem',
            lineHeight: 1.6,
            letterSpacing: '-0.014em',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '1rem',
            lineHeight: 1.6,
            letterSpacing: '-0.011em',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            letterSpacing: '-0.011em',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            letterSpacing: '0em',
        },
        button: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            letterSpacing: '0em',
            fontWeight: 500,
            textTransform: 'none',
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
        },
        overline: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
            letterSpacing: '0.08em',
            fontWeight: 600,
            textTransform: 'uppercase',
        },
    },
    shape: {
        borderRadius: 10,
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.625rem',
                    padding: '0.5rem 1rem',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                sizeSmall: {
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.875rem',
                },
                sizeLarge: {
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                },
            },
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0.625rem',
                    boxShadow: 'none',
                    border: `1px solid ${mode === 'light' ? nord.nord4 : nord.nord2}`,
                    backgroundImage: 'none',
                },
            },
            defaultProps: {
                elevation: 0,
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '1.5rem',
                    '&:last-child': {
                        paddingBottom: '1.5rem',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.625rem',
                        '& fieldset': {
                            borderColor: mode === 'light' ? nord.nord4 : nord.nord2,
                        },
                        '&:hover fieldset': {
                            borderColor: mode === 'light' ? nord.nord3 : nord.nord3,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: nord.nord10,
                            borderWidth: '1px',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                    fontWeight: 500,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundImage: 'none',
                },
            },
            defaultProps: {
                elevation: 0,
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                rounded: {
                    borderRadius: '0.625rem',
                },
            },
            defaultProps: {
                elevation: 0,
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: mode === 'light' ? nord.nord4 : nord.nord2,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                },
            },
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
            defaultProps: {
                disableElevation: true,
            },
        },
    },
});

export const lightTheme = createTheme(getDesignTokens('light'));

export const darkTheme = createTheme(getDesignTokens('dark'));

export const getTheme = (mode: 'light' | 'dark') => {
    return mode === 'dark' ? darkTheme : lightTheme;
};
