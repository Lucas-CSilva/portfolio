import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { generateSlug, findProjectBySlug } from '@/lib/projects';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import type { Metadata } from 'next';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: generateSlug(project.title),
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = findProjectBySlug(projects, slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'website',
        },
    };
}


export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = findProjectBySlug(projects, slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailView project={project} />;
}
