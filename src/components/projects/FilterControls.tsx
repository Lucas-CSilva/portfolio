'use client';

import type { Technology, Category } from '@/lib/types';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';
import { Button, Divider, ButtonGroup, Chip } from '@heroui/react';
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
            variant="bordered"
            size="sm"
            startContent={<SlidersHorizontal className="w-4 h-4" />}
            onPress={() => setShowFilters(!showFilters)}
          >
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
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-default-500">
                  Filtros ativos:
                </span>
                <Button
                  variant="light"
                  size="sm"
                  color="danger"
                  startContent={<X className="w-4 h-4" />}
                  onPress={clearAllFilters}
                >
                  Limpar Todos
                </Button>
              </div>
              <Divider />
            </>
          )}

          {/* Technology Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                Tecnologias
              </h3>
              {activeTech && (
                <Button
                  variant="light"
                  size="sm"
                  startContent={<X className="w-3 h-3" />}
                  onPress={() => setTechFilter(null)}
                >
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
                    variant={isActive ? "solid" : "bordered"}
                    color={isActive ? "primary" : "default"}
                    size="sm"
                    onPress={() => setTechFilter(tech.slug)}
                    endContent={
                      <Chip
                        size="sm"
                        variant="flat"
                        color={isActive ? "primary" : "default"}
                        classNames={{
                          base: "h-5 min-w-5 px-1",
                          content: "text-xs font-mono font-bold px-1"
                        }}
                      >
                        {tech.count}
                      </Chip>
                    }
                  >
                    {tech.name}
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
                    variant="light"
                    size="sm"
                    startContent={<X className="w-3 h-3" />}
                    onPress={() => setCategoryFilter(null)}
                  >
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
                      variant={isActive ? "flat" : "bordered"}
                      color={isActive ? "secondary" : "default"}
                      size="sm"
                      onPress={() => setCategoryFilter(category.slug)}
                      endContent={
                        <Chip
                          size="sm"
                          variant="flat"
                          color={isActive ? "secondary" : "default"}
                          classNames={{
                            base: "h-5 min-w-5 px-1",
                            content: "text-xs font-mono font-bold px-1"
                          }}
                        >
                          {category.count}
                        </Chip>
                      }
                    >
                      {category.name}
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