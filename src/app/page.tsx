import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjectsCarousel } from '@/components/sections/FeaturedProjectsCarousel';
import { ProjectGallerySection } from '@/components/sections/ProjectGallerySection';
import { projectRepository } from '@/repositories';

export default async function Home() {
  const sortedProjects = projectRepository.getAll();

  return (
    <main className="min-h-screen">
      <AboutSection />
      <FeaturedProjectsCarousel projects={sortedProjects} />
      <ProjectGallerySection projects={sortedProjects} />
    </main>
  );
}
