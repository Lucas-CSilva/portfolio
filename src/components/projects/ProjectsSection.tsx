import type { Project } from '@/lib/types';
import { ProjectGallery } from './ProjectGallery';
import { FilterControls } from './FilterControls';
import { getTechnologies } from '@/lib/technologies';
import { getCategories } from '@/lib/projects';

interface ProjectsSectionProps {
  projects: Project[];
  allProjects: Project[];
}

export function ProjectsSection({ projects, allProjects }: ProjectsSectionProps) {
  const technologies = getTechnologies(allProjects);
  const categories = getCategories(allProjects);

  return (
    <section className="w-full max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12 py-16 md:py-24 space-y-12">
      
      <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
          Galeria Completa
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          Explore projetos organizados por tecnologia, contexto e palavras-chave.
          Filtragem instantânea para uma experiência fluida.
        </p>
      </div>
      
      <div className="space-y-10">
        <FilterControls 
          technologies={technologies}
          categories={categories}
          totalProjects={allProjects.length}
          filteredCount={projects.length}
        />
        <ProjectGallery projects={projects} />
      </div>

    </section>
  );
}