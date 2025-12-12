'use client';

import { Box, Link, Typography, Container, useTheme, alpha, Stack } from '@mui/material';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                background: theme.palette.mode === 'dark'
                    ? `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
                    : alpha('#ffffff', 0.8),
                backdropFilter: 'blur(20px)',
                position: 'relative',
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: 1400, px: { xs: 2, sm: 3, md: 4 } }}>
                <Box
                    sx={{
                        py: { xs: 4, md: 6 },
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 3,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        }}
                    >
                        © {new Date().getFullYear()} Lucas C. Silva. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                        <Link
                            href="https://github.com/lucas-csilva"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'text.secondary',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: 'primary.main',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Github style={{ width: '18px', height: '18px' }} />
                            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                GitHub
                            </Box>
                        </Link>

                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'text.secondary',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: 'primary.main',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Linkedin style={{ width: '18px', height: '18px' }} />
                            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                LinkedIn
                            </Box>
                        </Link>

                        <Link
                            href="mailto:contato@exemplo.com"
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'text.secondary',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: 'primary.main',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Mail style={{ width: '18px', height: '18px' }} />
                            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                Contact
                            </Box>
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}