'use client';

import type { Technology } from '@/lib/types';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';
import { Button } from '@/components/ui/button';

interface FilterControlsProps {
  technologies: Technology[];
}

export function FilterControls({ technologies }: FilterControlsProps) {
  const { activeTech, setFilter } = useProjectFilter();

  return (
    <div className="mb-8 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Filtrar por Tecnologia
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTech === null ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter(null)}
          className="transition-all"
        >
          Todos os Projetos
        </Button>
        
        {technologies.map((tech) => {
          const isActive = activeTech === tech.slug;
          return (
            <Button
              key={tech.slug}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tech.slug)}
              className="group relative transition-all"
            >
              {tech.name}
              <span 
                className={`ml-2 text-xs py-0.5 px-1.5 rounded-full ${
                    isActive 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tech.count}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}