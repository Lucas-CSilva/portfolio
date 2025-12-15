import { Stack, Typography, alpha, useTheme } from '@mui/material';

export interface CarouselHeaderProps {
    overline?: string;
    title: string;
    description?: string;
}

export function CarouselHeader({ overline = 'Portfolio Highlights', title, description }: CarouselHeaderProps) {
    const theme = useTheme();

    return (
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
                variant="overline"
                sx={{
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'primary.main',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                }}
            >
                {overline}
            </Typography>
            <Typography
                variant="h2"
                sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    background:
                        theme.palette.mode === 'dark'
                            ? `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(
                                  theme.palette.text.primary,
                                  0.7
                              )} 100%)`
                            : `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.dark} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                {title}
            </Typography>
            {description && (
                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: 600,
                        color: 'text.secondary',
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        lineHeight: 1.7,
                    }}
                >
                    {description}
                </Typography>
            )}
        </Stack>
    );
}
