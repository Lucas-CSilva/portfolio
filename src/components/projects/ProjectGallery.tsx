import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { MobileCarousel } from './MobileCarousel';
import { EmptyState } from '@/components/ui/EmptyState';

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return <EmptyState message="No projects found matching your filter." />;
  }

  return (
    <>
      {/* Desktop: CSS Grid (≥768px) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {/* Mobile: Embla Carousel (<768px) */}
      <div className="md:hidden">
        <MobileCarousel projects={projects} />
      </div>
    </>
  );
}
