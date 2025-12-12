'use client';

import type { Technology, Category } from '@/lib/types';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';
import { Button, Divider, Box, Chip, Typography, useTheme, alpha, Stack } from '@mui/material';
import { SearchInput } from './SearchInput';
import { ResultsCounter } from './ResultsCounter';
import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface FilterControlsProps {
    technologies: Technology[];
    categories: Category[];
    totalProjects: number;
    filteredCount: number;
}

export function FilterControls({
    technologies,
    categories,
    totalProjects,
    filteredCount
}: FilterControlsProps) {
    const theme = useTheme();
    const {
        search,
        activeTech,
        activeCategory,
        setSearch,
        setTechFilter,
        setCategoryFilter,
        clearAllFilters,
        hasActiveFilters,
        isPending
    } = useProjectFilter();

    const [showFilters, setShowFilters] = useState(false);

    return (
        <Stack spacing={3}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: { xs: '100%', sm: 'auto' }, flex: 1, maxWidth: 896 }}>
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar por nome ou palavra-chave..."
                    />
                </Box>

                <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
                    <ResultsCounter showing={filteredCount} total={totalProjects} />

                    <Button
                        variant="outlined"
                        size="medium"
                        startIcon={<SlidersHorizontal className="w-4 h-4" />}
                        onClick={() => setShowFilters(!showFilters)}
                        sx={{
                            fontWeight: 600,
                            borderWidth: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderWidth: 1.5,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                            },
                        }}
                    >
                        {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
                    </Button>
                </Stack>
            </Stack>

            {showFilters && (
                <Box
                    sx={{
                        opacity: isPending ? 0.5 : 1,
                        pointerEvents: isPending ? 'none' : 'auto',
                        animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '@keyframes slideDown': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-16px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            p: { xs: 3, md: 4 },
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`
                                : alpha('#ffffff', 0.8),
                            backdropFilter: 'blur(20px)',
                            border: theme.palette.mode === 'dark'
                                ? `1px solid ${alpha(theme.palette.divider, 0.2)}`
                                : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                            borderRadius: 3,
                        }}
                    >
                        <Stack spacing={3.5}>
                            {hasActiveFilters && (
                                <>
                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.secondary',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            Filtros ativos
                                        </Typography>
                                        <Button
                                            variant="text"
                                            size="small"
                                            color="error"
                                            startIcon={<X className="w-4 h-4" />}
                                            onClick={clearAllFilters}
                                            sx={{
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                                },
                                            }}
                                        >
                                            Limpar Todos
                                        </Button>
                                    </Stack>
                                    <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.3) }} />
                                </>
                            )}

                            <Stack spacing={2}>
                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            fontWeight: 700,
                                            letterSpacing: '0.12em',
                                            color: 'text.primary',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        Tecnologias
                                    </Typography>
                                    {activeTech && (
                                        <Button
                                            variant="text"
                                            size="small"
                                            startIcon={<X className="w-3 h-3" />}
                                            onClick={() => setTechFilter(null)}
                                            sx={{
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            Limpar
                                        </Button>
                                    )}
                                </Stack>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                    {technologies.map((tech) => {
                                        const isActive = activeTech === tech.slug;
                                        return (
                                            <Button
                                                key={tech.slug}
                                                variant={isActive ? 'contained' : 'outlined'}
                                                size="medium"
                                                onClick={() => setTechFilter(tech.slug)}
                                                endIcon={
                                                    <Chip
                                                        label={tech.count}
                                                        size="small"
                                                        sx={{
                                                            height: '22px',
                                                            minWidth: '22px',
                                                            fontSize: '0.75rem',
                                                            fontFamily: 'monospace',
                                                            fontWeight: 700,
                                                            bgcolor: isActive
                                                                ? alpha(theme.palette.primary.contrastText, 0.2)
                                                                : alpha(theme.palette.text.secondary, 0.1),
                                                            color: isActive ? 'primary.contrastText' : 'text.secondary',
                                                            '& .MuiChip-label': { px: 0.75 },
                                                        }}
                                                    />
                                                }
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem',
                                                    py: 1,
                                                    px: 2,
                                                    borderRadius: 2,
                                                    borderWidth: 1.5,
                                                    transition: 'all 0.3s ease',
                                                    ...(isActive ? {
                                                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                                                    } : {}),
                                                    '&:hover': {
                                                        borderWidth: 1.5,
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                                                    },
                                                }}
                                            >
                                                {tech.name}
                                            </Button>
                                        );
                                    })}
                                </Box>
                            </Stack>

                            {categories.length > 0 && (
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                fontWeight: 700,
                                                letterSpacing: '0.12em',
                                                color: 'text.primary',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            Contexto / Módulo
                                        </Typography>
                                        {activeCategory && (
                                            <Button
                                                variant="text"
                                                size="small"
                                                startIcon={<X className="w-3 h-3" />}
                                                onClick={() => setCategoryFilter(null)}
                                                sx={{
                                                    fontWeight: 600,
                                                    textTransform: 'none',
                                                    fontSize: '0.8125rem',
                                                }}
                                            >
                                                Limpar
                                            </Button>
                                        )}
                                    </Stack>

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                        {categories.map((category) => {
                                            const isActive = activeCategory === category.slug;
                                            return (
                                                <Button
                                                    key={category.slug}
                                                    variant={isActive ? 'contained' : 'outlined'}
                                                    color={isActive ? 'secondary' : 'primary'}
                                                    size="medium"
                                                    onClick={() => setCategoryFilter(category.slug)}
                                                    endIcon={
                                                        <Chip
                                                            label={category.count}
                                                            size="small"
                                                            sx={{
                                                                height: '22px',
                                                                minWidth: '22px',
                                                                fontSize: '0.75rem',
                                                                fontFamily: 'monospace',
                                                                fontWeight: 700,
                                                                bgcolor: isActive
                                                                    ? alpha(theme.palette.secondary.contrastText, 0.2)
                                                                    : alpha(theme.palette.text.secondary, 0.1),
                                                                color: isActive ? 'secondary.contrastText' : 'text.secondary',
                                                                '& .MuiChip-label': { px: 0.75 },
                                                            }}
                                                        />
                                                    }
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        fontSize: '0.875rem',
                                                        py: 1,
                                                        px: 2,
                                                        borderRadius: 2,
                                                        borderWidth: 1.5,
                                                        transition: 'all 0.3s ease',
                                                        ...(isActive ? {
                                                            boxShadow: `0 4px 16px ${alpha(theme.palette.secondary.main, 0.3)}`,
                                                        } : {}),
                                                        '&:hover': {
                                                            borderWidth: 1.5,
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: `0 4px 16px ${alpha(isActive ? theme.palette.secondary.main : theme.palette.primary.main, 0.25)}`,
                                                        },
                                                    }}
                                                >
                                                    {category.name}
                                                </Button>
                                            );
                                        })}
                                    </Box>
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                </Box>
            )}
        </Stack>
    );
}