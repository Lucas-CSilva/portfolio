'use client';

import type { Technology, Category } from '@/lib/types';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';
import { Button, Divider, Box, Chip, Typography } from '@mui/material';
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

  const [showFilters, setShowFilters] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
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
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <ResultsCounter showing={filteredCount} total={totalProjects} />
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<SlidersHorizontal className="w-4 h-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            opacity: isPending ? 0.5 : 1,
            pointerEvents: isPending ? 'none' : 'auto',
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-8px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {hasActiveFilters && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }} className="text-[var(--text-secondary)]">
                  Filtros ativos:
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  startIcon={<X className="w-4 h-4" />}
                  onClick={clearAllFilters}
                >
                  Limpar Todos
                </Button>
              </Box>
              <Divider className="border-[var(--border-default)]" />
            </>
          )}

          {/* Technology Filters */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant="overline"
                sx={{ fontWeight: 700, letterSpacing: '0.08em' }}
                className="text-[var(--text-primary)]"
              >
                Tecnologias
              </Typography>
              {activeTech && (
                <Button
                  variant="text"
                  size="small"
                  startIcon={<X className="w-3 h-3" />}
                  onClick={() => setTechFilter(null)}
                >
                  Limpar
                </Button>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {technologies.map((tech) => {
                const isActive = activeTech === tech.slug;
                return (
                  <Button
                    key={tech.slug}
                    variant={isActive ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setTechFilter(tech.slug)}
                    endIcon={
                      <Chip
                        label={tech.count}
                        size="small"
                        sx={{
                          height: '20px',
                          minWidth: '20px',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          '& .MuiChip-label': { px: 0.5 },
                        }}
                        className={isActive ? 'bg-primary/20' : 'bg-[var(--bg-elevated)]'}
                      />
                    }
                    sx={{ textTransform: 'none' }}
                  >
                    {tech.name}
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* Category Filters */}
          {categories.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 700, letterSpacing: '0.08em' }}
                  className="text-[var(--text-primary)]"
                >
                  Contexto / Módulo
                </Typography>
                {activeCategory && (
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<X className="w-3 h-3" />}
                    onClick={() => setCategoryFilter(null)}
                  >
                    Limpar
                  </Button>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => {
                  const isActive = activeCategory === category.slug;
                  return (
                    <Button
                      key={category.slug}
                      variant={isActive ? 'contained' : 'outlined'}
                      color={isActive ? 'secondary' : 'primary'}
                      size="small"
                      onClick={() => setCategoryFilter(category.slug)}
                      endIcon={
                        <Chip
                          label={category.count}
                          size="small"
                          sx={{
                            height: '20px',
                            minWidth: '20px',
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            '& .MuiChip-label': { px: 0.5 },
                          }}
                          className={isActive ? 'bg-secondary/20' : 'bg-[var(--bg-elevated)]'}
                        />
                      }
                      sx={{ textTransform: 'none' }}
                    >
                      {category.name}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}