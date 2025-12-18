import * as React from 'react';
import { Grid, Stack, Typography, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import type { Project } from '@/types';
import { getStatusLabel } from '@/lib/project-helpers';

interface ProjectStatsProps {
    status: Project['status'];
    technologiesCount: number;
    context?: string;
}

export function ProjectStats({ status, technologiesCount, context }: ProjectStatsProps) {
    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'completed':
                return 'success.main';
            case 'in-progress':
                return 'warning.main';
            default:
                return 'info.main';
        }
    };

    return (
        <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 4 }}>
                <Stack spacing={1.5}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CheckCircleIcon
                            sx={{
                                fontSize: 24,
                                color: getStatusColor(status),
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: '1.125rem',
                            }}
                        >
                            {getStatusLabel(status)}
                        </Typography>
                    </Box>
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
                <Stack spacing={1.5}>
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
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: '1.125rem',
                        }}
                    >
                        {technologiesCount} {technologiesCount === 1 ? 'Technology' : 'Technologies'}
                    </Typography>
                </Stack>
            </Grid>

            {context && (
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Stack spacing={1.5}>
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
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: '1.125rem',
                            }}
                        >
                            {context}
                        </Typography>
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
}
