'use client';

import type { Technology, Category } from '@/lib/types';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-6">
      {/* Search Bar and Results Counter Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:flex-1 max-w-2xl">
          <SearchInput 
            value={search} 
            onChange={setSearch}
            placeholder="Buscar por nome ou palavra-chave..."
          />
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <ResultsCounter showing={filteredCount} total={totalProjects} />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </Button>
        </div>
      </div>

      {/* Filter Panels */}
      {showFilters && (
        <div className={`
          space-y-6 
          animate-in fade-in slide-in-from-top-4 duration-300
          ${isPending ? 'opacity-50 pointer-events-none' : ''}
        `}>
          
          {/* Active Filters Bar with Clear All */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">
                Filtros ativos:
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
                Limpar Todos
              </Button>
            </div>
          )}

          {/* Technology Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                Tecnologias
              </h3>
              {activeTech && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTechFilter(null)}
                  className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                  Limpar
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const isActive = activeTech === tech.slug;
                return (
                  <Button
                    key={tech.slug}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTechFilter(tech.slug)}
                    className={`
                      group relative transition-all duration-200
                      ${isActive 
                        ? 'shadow-lg shadow-primary/20 scale-105' 
                        : 'hover:scale-105 hover:border-primary/30'
                      }
                    `}
                  >
                    {tech.name}
                    <span className={`
                      ml-2 text-xs py-0.5 px-1.5 rounded-full font-mono font-bold
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                      }
                    `}>
                      {tech.count}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                  Contexto / Módulo
                </h3>
                {activeCategory && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCategoryFilter(null)}
                    className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                    Limpar
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category.slug;
                  return (
                    <Button
                      key={category.slug}
                      variant={isActive ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter(category.slug)}
                      className={`
                        group relative transition-all duration-200
                        ${isActive 
                          ? 'shadow-md shadow-secondary/20 scale-105' 
                          : 'hover:scale-105 hover:border-secondary/30'
                        }
                      `}
                    >
                      {category.name}
                      <span className={`
                        ml-2 text-xs py-0.5 px-1.5 rounded-full font-mono font-bold
                        transition-colors duration-200
                        ${isActive 
                          ? 'bg-secondary-foreground/20 text-secondary-foreground' 
                          : 'bg-muted text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary'
                        }
                      `}>
                        {category.count}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}