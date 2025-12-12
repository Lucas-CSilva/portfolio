import { Box, Typography, useTheme, alpha, Stack } from '@mui/material';
import { FolderSearch } from 'lucide-react';

interface EmptyStateProps {
    message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 8, md: 12 },
                px: 3,
                animation: 'fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                '@keyframes fadeInScale': {
                    from: {
                        opacity: 0,
                        transform: 'scale(0.9) translateY(20px)',
                    },
                    to: {
                        opacity: 1,
                        transform: 'scale(1) translateY(0)',
                    },
                },
            }}
        >
            <Stack spacing={3} alignItems="center" textAlign="center" sx={{ maxWidth: 480 }}>
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: theme.palette.mode === 'dark'
                            ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`
                            : alpha('#ffffff', 0.8),
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.4 : 0.1)}`,
                    }}
                >
                    <FolderSearch
                        style={{
                            width: '36px',
                            height: '36px',
                            color: theme.palette.text.secondary,
                        }}
                    />
                </Box>

                <Stack spacing={1.5}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {message}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            lineHeight: 1.7,
                            fontSize: '0.9375rem',
                        }}
                    >
                        Tente selecionar uma tecnologia diferente ou limpe os filtros para visualizar todos os projetos.
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}