'use client';

import * as React from 'react';
import {
    Box,
    Container,
    Stack,
    Divider,
    alpha,
    useTheme,
} from '@mui/material';
import type { Project } from '@/types';
import { BackButton } from '../ui/BackButton';
import { ProjectHeader } from './detail/ProjectHeader';
import { ProjectActions } from './detail/ProjectActions';
import { ProjectStats } from './detail/ProjectStats';
import { TechnologyStack } from './detail/TechnologyStack';

interface ProjectDetailViewProps {
    project: Project;
    showBackButton?: boolean;
}

export function ProjectDetailView({ project, showBackButton = true }: ProjectDetailViewProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: '100vh',
                background: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.default, 0.4)
                    : alpha(theme.palette.background.default, 0.4),
            }}
        >
            <Container 
                maxWidth="lg" 
                sx={{ 
                    position: 'relative', 
                    zIndex: 1,
                    py: { xs: 6, md: 10 },
                }}
            >
                <Stack spacing={{ xs: 5, md: 7 }}>
                    {/* Header Section */}
                    <Stack spacing={4}>
                        {showBackButton && (
                            <Box
                                sx={{
                                    animation: 'fadeInLeft 0.6s ease-out',
                                    '@keyframes fadeInLeft': {
                                        from: {
                                            opacity: 0,
                                            transform: 'translateX(-20px)',
                                        },
                                        to: {
                                            opacity: 1,
                                            transform: 'translateX(0)',
                                        },
                                    },
                                }}
                            >
                                <BackButton />
                            </Box>
                        )}

                        {/* Hero Content */}
                        <ProjectHeader project={project} />
                    </Stack>

                    {/* Action Buttons */}
                    <ProjectActions liveUrl={project.liveUrl} repoUrl={project.repoUrl} />

                    {/* Main Content Card */}
                    <Box
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.75)} 100%)`
                                : '#ffffff',
                            backdropFilter: 'blur(20px)',
                            border: theme.palette.mode === 'dark'
                                ? `1px solid ${alpha(theme.palette.divider, 0.3)}`
                                : `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                            borderRadius: 3,
                            p: { xs: 3, sm: 4, md: 6 },
                            animation: 'fadeInUp 0.7s ease-out',
                            animationDelay: '0.3s',
                            animationFillMode: 'both',
                        }}
                    >
                        <Stack spacing={5}>
                            {/* Project Stats */}
                            <ProjectStats 
                                status={project.status}
                                technologiesCount={project.technologies.length}
                                context={project.context}
                            />

                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.4) }} />

                            {/* Technology Stack */}
                            <TechnologyStack technologies={project.technologies} />
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}