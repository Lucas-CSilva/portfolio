import type { Project } from '@/lib/types';
import { ProjectGallery } from './ProjectGallery';
import { FilterControls } from './FilterControls';
import { getTechnologies } from '@/lib/technologies';

interface ProjectsSectionProps {
  projects: Project[];
  allProjects: Project[];
}

export function ProjectsSection({ projects, allProjects }: ProjectsSectionProps) {
  const technologies = getTechnologies(allProjects);

  return (
    // CORREÇÃO:
    // 1. 'w-full max-w-7xl mx-auto' -> Garante largura máxima e centralização em qualquer tela.
    // 2. 'px-6 lg:px-8' -> Garante margem lateral de segurança para que não cole na borda.
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 space-y-12">
      
      <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
          Projetos Selecionados
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          Aplicações focadas em performance, acessibilidade e na resolução de problemas complexos.
        </p>
      </div>
      
      <div className="space-y-10">
        <FilterControls technologies={technologies} />
        <ProjectGallery projects={projects} />
      </div>

    </section>
  );
}