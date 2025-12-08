import { Hero } from '@/components/hero/Hero';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { projects } from '@/data/projects';
import { filterProjects } from '@/lib/projects';

interface HomeProps {
  searchParams: Promise<{ tech?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const techFilter = params.tech ?? null;

  // Sort all projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  // Filter projects if tech param exists
  const filteredProjects = filterProjects(sortedProjects, techFilter);

  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsSection projects={filteredProjects} allProjects={sortedProjects} />
    </main>
  );
}
