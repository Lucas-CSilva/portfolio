'use client';

import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import type { ProjectStatus } from '@/lib/types';
import { getStatusLabel } from '@/lib/projects';

interface StatusBadgeProps {
    status: ProjectStatus;
    size?: 'small' | 'medium';
}

const STATUS_CONFIG: Record<ProjectStatus, { icon: typeof CheckCircleIcon; color: 'success' | 'warning' | 'info' }> = {
    'completed': {
        icon: CheckCircleIcon,
        color: 'success',
    },
    'in-progress': {
        icon: HourglassEmptyIcon,
        color: 'warning',
    },
    'to-do': {
        icon: PlaylistAddCheckIcon,
        color: 'info',
    },
};

export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
    const config = STATUS_CONFIG[status];
    const Icon = config.icon;

    return (
        <Chip
            icon={<Icon />}
            label={getStatusLabel(status)}
            color={config.color}
            size={size}
            sx={{
                fontWeight: 500,
                '& .MuiChip-icon': {
                    fontSize: size === 'small' ? '1rem' : '1.25rem',
                },
            }}
        />
    );
}
