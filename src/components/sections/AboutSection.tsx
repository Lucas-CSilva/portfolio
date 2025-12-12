'use client';

import { Button, Card, CardContent, Chip, Link, Divider, Box, Typography, useTheme, alpha, Stack } from '@mui/material';
import { Github, Linkedin, Mail, } from 'lucide-react';

export function AboutSection() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 12, md: 16 },
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    height: '90%',
                    background: theme.palette.mode === 'dark'
                        ? `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 40%, transparent 70%)`
                        : `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <Box id="about" sx={{ position: 'relative', zIndex: 1, maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, width: '100%' }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' },
                        gap: { xs: 6, lg: 8 },
                        alignItems: 'center',
                    }}
                >
                    <Stack spacing={{ xs: 5, md: 6 }}>
                        <Stack spacing={3}>
                            <Stack spacing={1.5}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 600,
                                        letterSpacing: '0.15em',
                                        color: 'primary.main',
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Backend Developer
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                                        fontWeight: 700,
                                        letterSpacing: '-0.02em',
                                        background: theme.palette.mode === 'dark'
                                            ? `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`
                                            : `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.dark} 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Lucas Silva
                                </Typography>
                            </Stack>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.75rem' },
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    maxWidth: 672,
                                    color: 'text.secondary',
                                }}
                            >
                                Construindo sistemas robustos e escaláveis com foco em performance e qualidade
                            </Typography>
                        </Stack>

                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.7,
                                maxWidth: 672,
                                color: 'text.secondary',
                                fontSize: { xs: '0.95rem', md: '1rem' },
                            }}
                        >
                            Desenvolvedor backend especializado em criar arquiteturas escaláveis e sistemas distribuídos.
                            Formado em Ciência da Computação pela UNESP, com foco em APIs robustas, performance e soluções de nível empresarial.
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="outlined"
                                size="large"
                                component={Link}
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<Github className="h-5 w-5" />}
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.9375rem',
                                    py: 1.25,
                                    px: 3,
                                    borderRadius: 2,
                                    borderWidth: 1.5,
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderWidth: 1.5,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    },
                                }}
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component={Link}
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<Linkedin className="h-5 w-5" />}
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.9375rem',
                                    py: 1.25,
                                    px: 3,
                                    borderRadius: 2,
                                    borderWidth: 1.5,
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderWidth: 1.5,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    },
                                }}
                            >
                                LinkedIn
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                href="mailto:contato@example.com"
                                startIcon={<Mail className="h-5 w-5" />}
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.9375rem',
                                    py: 1.25,
                                    px: 3,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 8px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    },
                                }}
                            >
                                Contact
                            </Button>
                        </Stack>
                    </Stack>

                    <Card
                        elevation={0}
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.75)} 100%)`
                                : '#ffffff',
                            backdropFilter: 'blur(20px)',
                            border: theme.palette.mode === 'dark'
                                ? `1px solid ${alpha(theme.palette.divider, 0.3)}`
                                : `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                            borderRadius: 3,
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 4,
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                opacity: 0,
                                transition: 'opacity 0.4s ease',
                            },
                            '&:hover': {
                                transform: 'translateY(-4px) scale(1.01)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? `0 20px 60px ${alpha(theme.palette.common.black, 0.7)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.15)}`
                                    : `0 20px 60px ${alpha(theme.palette.common.black, 0.2)}`,
                                borderColor: alpha(theme.palette.primary.main, 0.4),
                                '&::before': {
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                            <Stack spacing={{ xs: 3, md: 3.5 }}>
                                <Stack spacing={2}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            letterSpacing: '-0.02em',
                                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                                        }}
                                    >
                                        Formação e Experiência
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                lineHeight: 1.7,
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.875rem', md: '0.9rem' },
                                            }}
                                        >
                                            Desenvolvedor backend com sólida formação em Ciência da Computação pela UNESP,
                                            com experiência em construir aplicações backend de alta qualidade para diversas indústrias.
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                lineHeight: 1.7,
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.875rem', md: '0.9rem' },
                                            }}
                                        >
                                            Minha abordagem combina excelência técnica com boas práticas de engenharia de software,
                                            garantindo soluções que são performáticas, seguras e escaláveis.
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.4) }} />

                                <Stack spacing={2}>
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            fontWeight: 600,
                                            letterSpacing: '0.12em',
                                            color: 'text.secondary',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        Tecnologias Principais
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {[
                                            'Java',
                                            'Spring Boot',
                                            'WebFlux',
                                            'C#',
                                            '.NET',
                                            'Python',
                                            'FastAPI',
                                            'MongoDB',
                                            'MS SQL',
                                        ].map((skill) => (
                                            <Chip
                                                key={skill}
                                                label={skill}
                                                size="medium"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: '0.8125rem',
                                                    height: 32,
                                                    bgcolor: theme.palette.mode === 'dark'
                                                        ? alpha(theme.palette.primary.main, 0.15)
                                                        : alpha(theme.palette.primary.main, 0.08),
                                                    color: 'primary.main',
                                                    border: theme.palette.mode === 'dark'
                                                        ? `1px solid ${alpha(theme.palette.primary.main, 0.35)}`
                                                        : `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                                    backdropFilter: 'blur(8px)',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        bgcolor: theme.palette.mode === 'dark'
                                                            ? alpha(theme.palette.primary.main, 0.25)
                                                            : alpha(theme.palette.primary.main, 0.15),
                                                        borderColor: theme.palette.mode === 'dark'
                                                            ? alpha(theme.palette.primary.main, 0.6)
                                                            : alpha(theme.palette.primary.main, 0.4),
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: theme.palette.mode === 'dark'
                                                            ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                                                            : 'none',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}