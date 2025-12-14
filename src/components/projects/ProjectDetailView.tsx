'use client';

import * as React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Grid,
    Divider,
    Button,
    alpha,
} from '@mui/material';
import {
    GitHub as GitHubIcon,
    Launch as LaunchIcon,
} from '@mui/icons-material';
import type { Project } from '@/lib/types';
import { getStatusLabel } from '@/lib/projects';
import { StatusBadge } from './StatusBadge';
import { TechBadge } from '../ui/TechBadge';
import { BackButton } from '../ui/BackButton';

interface ProjectDetailViewProps {
    project: Project;
    showBackButton?: boolean;
}

export function ProjectDetailView({ project, showBackButton = true }: ProjectDetailViewProps) {
    return (
        <Box
            sx={{
                py: { xs: 6, md: 10 },
                minHeight: '70vh',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={{ xs: 4, md: 6 }}>
                    {showBackButton && (
                        <Box>
                            <BackButton />
                        </Box>
                    )}

                    <Stack spacing={3}>
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    mb: 2,
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`
                                        : `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.dark} 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {project.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <StatusBadge status={project.status} size="medium" />
                                {project.context && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            color: 'primary.main',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {project.context}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                lineHeight: 1.8,
                                color: 'text.secondary',
                                maxWidth: 900,
                            }}
                        >
                            {project.description}
                        </Typography>
                    </Stack>

                    <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.4) }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Stack spacing={1}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 600,
                                        letterSpacing: '0.12em',
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    Status
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'text.primary',
                                    }}
                                >
                                    {getStatusLabel(project.status)}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Stack spacing={1}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 600,
                                        letterSpacing: '0.12em',
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    Technologies
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'text.primary',
                                    }}
                                >
                                    {project.technologies.length} {project.technologies.length === 1 ? 'Technology' : 'Technologies'}
                                </Typography>
                            </Stack>
                        </Grid>
                        {project.context && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Stack spacing={1}>
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            fontWeight: 600,
                                            letterSpacing: '0.12em',
                                            color: 'text.secondary',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        Category
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 500,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {project.context}
                                    </Typography>
                                </Stack>
                            </Grid>
                        )}
                    </Grid>

                    <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.4) }} />

                    <Stack spacing={2}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 700,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Technology Stack
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1.5,
                            }}
                        >
                            {project.technologies.map((tech) => (
                                <TechBadge key={tech} technology={tech} />
                            ))}
                        </Box>
                    </Stack>

                    {(project.liveUrl || project.repoUrl) && (
                        <>
                            <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.4) }} />
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                            >
                                {project.liveUrl && (
                                    <Button
                                        variant="contained"
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        startIcon={<LaunchIcon />}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            py: 1.5,
                                            px: 3,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                                transform: 'translateY(-2px)',
                                                boxShadow: (theme) => `0 8px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        View Live Demo
                                    </Button>
                                )}
                                {project.repoUrl && (
                                    <Button
                                        variant="outlined"
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        startIcon={<GitHubIcon />}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            py: 1.5,
                                            px: 3,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            borderWidth: 1.5,
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            bgcolor: 'transparent',
                                            '&:hover': {
                                                borderWidth: 1.5,
                                                borderColor: 'primary.main',
                                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                transform: 'translateY(-2px)',
                                                boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        View Source Code
                                    </Button>
                                )}
                            </Stack>
                        </>
                    )}

                    {/* Image Gallery (if images exist) */}
                    {project.images && project.images.length > 0 && (
                        <>
                            <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.4) }} />
                            <Stack spacing={2}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                        fontWeight: 700,
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    Gallery
                                </Typography>
                                <Grid container spacing={2}>
                                    {project.images.map((image, index) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                            <Box
                                                component="img"
                                                src={image}
                                                alt={`${project.title} screenshot ${index + 1}`}
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    borderRadius: 2,
                                                    border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.02)',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        </>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
