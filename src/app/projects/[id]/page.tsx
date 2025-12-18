import { notFound } from 'next/navigation';
import { projectRepository } from '@/repositories';
import { projectService } from '@/services';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import type { Metadata } from 'next';

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const projects = projectRepository.getAll();
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projectService.getProjectById(id);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            type: 'website',
        },
    };
}


export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = projectService.getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectDetailView project={project} />;
}
