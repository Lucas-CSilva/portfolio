import { Box, Stack, alpha, useTheme } from '@mui/material';

export interface CarouselIndicatorsProps {
    count: number;
    currentIndex: number;
    onIndicatorClick: (index: number) => void;
    disabled?: boolean;
}

export function CarouselIndicators({ count, currentIndex, onIndicatorClick, disabled = false }: CarouselIndicatorsProps) {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center" sx={{ mt: { xs: 4, md: 5 } }}>
            {Array.from({ length: count }, (_, index) => (
                <Box
                    key={index}
                    component="button"
                    onClick={() => onIndicatorClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentIndex === index ? 'true' : 'false'}
                    disabled={disabled}
                    sx={{
                        width: currentIndex === index ? 40 : 10,
                        height: 10,
                        borderRadius: 10,
                        border: 'none',
                        p: 0,
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        bgcolor:
                            currentIndex === index ? 'primary.main' : alpha(theme.palette.text.secondary, 0.25),
                        boxShadow:
                            currentIndex === index
                                ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                                : 'none',
                        '&:hover': {
                            bgcolor:
                                currentIndex === index
                                    ? 'primary.main'
                                    : alpha(theme.palette.text.secondary, 0.4),
                            transform: 'scale(1.1)',
                        },
                        '&:disabled': {
                            cursor: 'not-allowed',
                        },
                        '&:focus-visible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: 2,
                        },
                    }}
                />
            ))}
        </Stack>
    );
}
