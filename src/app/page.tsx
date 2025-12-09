import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjectsCarousel } from '@/components/sections/FeaturedProjectsCarousel';
import { ProjectGallerySection } from '@/components/sections/ProjectGallerySection';
import { projects } from '@/data/projects';

export default async function Home() {
  // Sort all projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen">
      <AboutSection />
      <FeaturedProjectsCarousel projects={sortedProjects} />
      <ProjectGallerySection projects={sortedProjects} />
    </main>
  );
}
