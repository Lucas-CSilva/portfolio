import { IconButton, alpha, useTheme } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

export interface CarouselNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    disabled?: boolean;
}

export function CarouselNavigation({ onPrevious, onNext, disabled = false }: CarouselNavigationProps) {
    const theme = useTheme();

    const buttonStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        width: 56,
        height: 56,
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(12px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            boxShadow: `0 12px 48px ${alpha(theme.palette.common.black, 0.15)}`,
        },
        '&:disabled': {
            opacity: 0.3,
        },
    } as const;

    return (
        <>
            <IconButton
                onClick={onPrevious}
                disabled={disabled}
                aria-label="Previous project"
                sx={{
                    ...buttonStyles,
                    left: 0,
                    '&:hover': {
                        ...buttonStyles['&:hover'],
                        transform: 'translateY(-50%) translateX(-4px)',
                    },
                }}
            >
                <ChevronLeftIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <IconButton
                onClick={onNext}
                disabled={disabled}
                aria-label="Next project"
                sx={{
                    ...buttonStyles,
                    right: 0,
                    '&:hover': {
                        ...buttonStyles['&:hover'],
                        transform: 'translateY(-50%) translateX(4px)',
                    },
                }}
            >
                <ChevronRightIcon sx={{ fontSize: 28 }} />
            </IconButton>
        </>
    );
}
