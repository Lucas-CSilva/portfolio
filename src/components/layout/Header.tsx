'use client';

import * as React from 'react';
import { AppBar, Toolbar, Box, Link as MuiLink, Container } from '@mui/material';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Featured', href: '#featured' },
    { name: 'Projects', href: '#gallery' },
];

export function Header() {
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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            window.history.pushState({}, '', href);
        }
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                transition: 'all 0.2s',
                backdropFilter: isScrolled ? 'blur(20px) saturate(150%)' : 'blur(8px)',
                borderBottom: isScrolled ? '1px solid' : 'none',
            }}
            className={cn(
                isScrolled
                    ? 'bg-[var(--bg-app)]/80 border-[var(--border-default)]/50'
                    : 'bg-[var(--bg-app)]/30 border-transparent'
            )}
        >
            <Container maxWidth={false} className="page-container">
                <Toolbar
                    sx={{
                        minHeight: '5rem',
                        px: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Brand */}
                    <MuiLink
                        href="/"
                        underline="none"
                        sx={{
                            fontWeight: 600,
                            fontSize: '1.125rem',
                            letterSpacing: '-0.02em',
                            transition: 'opacity 0.2s',
                            color: 'var(--text-primary)',
                            '&:hover': { opacity: 0.7 },
                        }}
                    >
                        Lucas Silva
                    </MuiLink>

                    {/* Navigation */}
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
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: 'var(--text-primary)',
                                    },
                                }}
                            >
                                {item.name}
                            </MuiLink>
                        ))}
                    </Box>

                    {/* Theme Toggle */}
                    <Box>
                        <ThemeToggle />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
