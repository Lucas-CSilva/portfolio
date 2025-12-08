'use client';

import type { Technology } from '@/lib/types';
import { useProjectFilter } from '@/lib/hooks/useProjectFilter';

interface FilterControlsProps {
  technologies: Technology[];
}

export function FilterControls({ technologies }: FilterControlsProps) {
  const { activeTech, setFilter } = useProjectFilter();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Filter by Technology
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter(null)}
          aria-pressed={activeTech === null}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTech === null
              ? 'bg-accent-primary text-white'
              : 'bg-app-surface text-text-secondary hover:bg-app-elevated border border-border-default'
          }`}
        >
          All Projects
        </button>
        {technologies.map((tech) => {
          const isActive = activeTech === tech.slug;
          return (
            <button
              key={tech.slug}
              onClick={() => setFilter(tech.slug)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-accent-primary text-white'
                  : 'bg-app-surface text-text-secondary hover:bg-app-elevated border border-border-default'
              }`}
            >
              {tech.name}
              <span className="ml-2 text-sm opacity-75">({tech.count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
