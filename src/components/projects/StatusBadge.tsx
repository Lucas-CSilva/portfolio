'use client';

import { Box, alpha, useTheme } from '@mui/material';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import type { ProjectStatus } from '@/lib/types';
import { getStatusLabel } from '@/lib/projects';

interface StatusBadgeProps {
    status: ProjectStatus;
    size?: 'small' | 'medium';
}

const STATUS_CONFIG: Record<ProjectStatus, { 
    colors: { 
        bg: string; 
        text: string; 
        border: string;
    }; 
    icon: typeof CheckCircle2;
}> = {
    'completed': {
        colors: {
            bg: '#10b981',
            text: '#ffffff',
            border: '#059669',
        },
        icon: CheckCircle2,
    },
    'in-progress': {
        colors: {
            bg: '#f59e0b',
            text: '#ffffff',
            border: '#d97706',
        },
        icon: Clock,
    },
    'to-do': {
        colors: {
            bg: '#6366f1',
            text: '#ffffff',
            border: '#4f46e5',
        },
        icon: Circle,
    },
};

export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
    const theme = useTheme();
    const config = STATUS_CONFIG[status];
    const label = getStatusLabel(status);
    const Icon = config.icon;
    
    const isSmall = size === 'small';
    const fontSize = isSmall ? '0.6875rem' : '0.75rem';
    const height = isSmall ? 24 : 28;
    const px = isSmall ? 1.25 : 1.5;
    const iconSize = isSmall ? 14 : 16;

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                height,
                px,
                borderRadius: '6px',
                fontSize,
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(config.colors.bg, 0.15)} 0%, ${alpha(config.colors.bg, 0.08)} 100%)`
                    : `linear-gradient(135deg, ${alpha(config.colors.bg, 0.12)} 0%, ${alpha(config.colors.bg, 0.06)} 100%)`,
                color: theme.palette.mode === 'dark' ? config.colors.text : config.colors.border,
                border: `1px solid ${alpha(config.colors.border, theme.palette.mode === 'dark' ? 0.3 : 0.2)}`,
                boxShadow: theme.palette.mode === 'dark' 
                    ? `inset 0 1px 0 ${alpha('#ffffff', 0.1)}`
                    : `0 1px 3px ${alpha(config.colors.border, 0.15)}, inset 0 1px 0 ${alpha('#ffffff', 0.6)}`,
                backdropFilter: 'blur(8px)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: `linear-gradient(180deg, ${alpha('#ffffff', theme.palette.mode === 'dark' ? 0.08 : 0.25)} 0%, transparent 100%)`,
                    pointerEvents: 'none',
                },
            }}
        >
            <Box
                component="span"
                sx={{
                    fontSize: iconSize,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon 
                    size={iconSize}
                    strokeWidth={2.5}
                    style={{
                        flexShrink: 0,
                    }}
                />
            </Box>
            <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
                {label}
            </Box>
        </Box>
    );
}