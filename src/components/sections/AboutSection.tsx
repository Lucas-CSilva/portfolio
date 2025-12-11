'use client';

import { Button, Card, CardContent, Chip, Link, Divider, Box, Typography, IconButton } from '@mui/material';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export function AboutSection() {
    const scrollToProjects = () => {
        const target = document.querySelector('#featured');
        if (target) {
            const headerOffset = 120;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box
            component="section"
            id="about"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 16,
            }}
        >
            <Box className="page-container">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' },
                        gap: 8,
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography
                                    variant="overline"
                                    sx={{ fontWeight: 500, letterSpacing: '0.08em' }}
                                    className="text-[var(--accent-primary)]"
                                >
                                    Backend Developer
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{ fontSize: { xs: '3rem', lg: '3.75rem' }, fontWeight: 600, letterSpacing: '-0.02em' }}
                                    className="text-[var(--text-primary)]"
                                >
                                    Lucas Silva
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1.5rem', lg: '1.875rem' },
                                    fontWeight: 400,
                                    lineHeight: 1.6,
                                    maxWidth: 672,
                                }}
                                className="text-[var(--text-secondary)]"
                            >
                                Construindo sistemas robustos e escaláveis com foco em performance e qualidade
                            </Typography>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{ lineHeight: 1.6, maxWidth: 672 }}
                            className="text-[var(--text-secondary)]"
                        >
                            Desenvolvedor backend especializado em criar arquiteturas escaláveis e sistemas distribuídos.
                            Formado em Ciência da Computação pela UNESP, com foco em APIs robustas, performance e soluções de nível empresarial.
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            <Button
                                variant="outlined"
                                size="medium"
                                component={Link}
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<Github className="h-4 w-4" />}
                                sx={{ fontWeight: 500 }}
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="outlined"
                                size="medium"
                                component={Link}
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<Linkedin className="h-4 w-4" />}
                                sx={{ fontWeight: 500 }}
                            >
                                LinkedIn
                            </Button>
                            <Button
                                variant="outlined"
                                size="medium"
                                component={Link}
                                href="mailto:contato@example.com"
                                startIcon={<Mail className="h-4 w-4" />}
                                sx={{ fontWeight: 500 }}
                            >
                                Contact
                            </Button>
                        </Box>
                    </Box>

                    <Card
                        elevation={0}
                        sx={{ border: '1px solid', backdropFilter: 'blur(8px)' }}
                        className="border-[var(--border-default)] bg-[var(--bg-surface)]/50"
                    >
                        <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                                    Formação e Experiência
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography variant="body2" className="text-[var(--text-secondary)]" sx={{ lineHeight: 1.6 }}>
                                        Desenvolvedor backend com sólida formação em Ciência da Computação pela UNESP,
                                        com experiência em construir aplicações backend de alta qualidade para diversas indústrias.
                                    </Typography>
                                    <Typography variant="body2" className="text-[var(--text-secondary)]" sx={{ lineHeight: 1.6 }}>
                                        Minha abordagem combina excelência técnica com boas práticas de engenharia de software,
                                        garantindo soluções que são performáticas, seguras e escaláveis.
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider className="border-[var(--border-default)]" />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography
                                    variant="overline"
                                    sx={{ fontWeight: 600, letterSpacing: '0.08em' }}
                                    className="text-[var(--text-secondary)]"
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
                                            variant="outlined"
                                            size="small"
                                            sx={{ fontWeight: 500, fontSize: '0.75rem', borderRadius: '0.5rem' }}
                                            className="bg-[var(--bg-elevated)] border-[var(--border-default)] text-[var(--text-secondary)]"
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Scroll Indicator - Subtle */}
                <Box sx={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)' }}>
                    <IconButton
                        size="small"
                        onClick={scrollToProjects}
                        sx={{
                            animation: 'bounce 2s infinite',
                            '@keyframes bounce': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-8px)' },
                            },
                        }}
                        className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        aria-label="Scroll to projects"
                    >
                        <ArrowDown className="h-5 w-5" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
