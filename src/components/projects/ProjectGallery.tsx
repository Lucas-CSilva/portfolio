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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={cn(
            // REMOVIDO: opacity-0 (causava o problema de invisibilidade permanente)
            // ADICIONADO: fill-mode-both (oculta durante o delay e mantém visível no final)
            "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both",
            "h-full" 
          )}
          style={{
            animationDelay: `${index * 100}ms`
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