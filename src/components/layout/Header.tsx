'use client';

import * as React from 'react';
import { AppBar, Toolbar, Box, Link as MuiLink, Container, useTheme, alpha } from '@mui/material';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Featured', href: '#featured' },
    { name: 'Projects', href: '#gallery' },
];

export function Header() {
    const theme = useTheme();
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });

            window.history.pushState({}, '', href);
        }
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: isScrolled ? 'blur(20px) saturate(150%)' : 'blur(12px)',
                borderBottom: isScrolled
                    ? `1px solid ${alpha(theme.palette.divider, 0.4)}`
                    : `1px solid transparent`,
                background: isScrolled
                    ? theme.palette.mode === 'dark'
                        ? `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
                        : alpha('#ffffff', 0.9)
                    : theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.default, 0.4)
                        : alpha('#ffffff', 0.4),
                boxShadow: isScrolled
                    ? `0 4px 24px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.3 : 0.05)}`
                    : 'none',
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: 1400, px: { xs: 2, sm: 3, md: 4 } }}>
                <Toolbar
                    sx={{
                        minHeight: { xs: '64px', md: '80px' },
                        px: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <MuiLink
                        href="/"
                        underline="none"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            letterSpacing: '-0.02em',
                            transition: 'all 0.3s ease',
                            color: 'text.primary',
                            '&:hover': {
                                opacity: 0.7,
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        Lucas Silva
                    </MuiLink>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 4,
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {navigation.map((item) => (
                            <MuiLink
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                underline="none"
                                sx={{
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-4px',
                                        left: 0,
                                        width: 0,
                                        height: '2px',
                                        bgcolor: 'primary.main',
                                        transition: 'width 0.3s ease',
                                        borderRadius: '2px',
                                    },
                                    '&:hover': {
                                        color: 'text.primary',
                                        transform: 'translateY(-2px)',
                                        '&::after': {
                                            width: '100%',
                                        },
                                    },
                                }}
                            >
                                {item.name}
                            </MuiLink>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeToggle />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}