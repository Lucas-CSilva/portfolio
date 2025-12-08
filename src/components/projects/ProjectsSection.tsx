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
    <section className="w-full px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
          Featured Projects
        </h2>
        <FilterControls technologies={technologies} />
        <ProjectGallery projects={projects} />
      </div>
    </section>
  );
}
