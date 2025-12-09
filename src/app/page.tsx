import { Hero } from '@/components/hero/Hero';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { projects } from '@/data/projects';
import { filterProjects } from '@/lib/projects';

interface HomeProps {
  searchParams: Promise<{ 
    search?: string;
    tech?: string;
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  
  // Sort all projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  // Apply all filters
  const filteredProjects = filterProjects(sortedProjects, {
    search: params.search ?? null,
    technology: params.tech ?? null,
    category: params.category ?? null,
  });

  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsSection 
        projects={filteredProjects} 
        allProjects={sortedProjects} 
      />
    </main>
  );
}
