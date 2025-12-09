import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return <EmptyState message="Nenhum projeto encontrado com este filtro." />;
  }

  return (
    <div className={cn(
      // Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop → 4 col ultrawide
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
      "gap-6 lg:gap-8",
      "mx-auto w-full"
    )}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={cn(
            "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both",
            "h-full"
          )}
          style={{
            animationDelay: `${index * 80}ms`
          }}
        >
          <div className="h-full transform transition-all hover:scale-[1.02]">
            <ProjectCard {...project} />
          </div>
        </div>
      ))}
    </div>
  );
}