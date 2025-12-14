import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';

import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import type { Metadata } from 'next';
import { findProjectById } from '@/lib/projects';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = findProjectById(projects, slug);

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
    const { slug } = await params;
    const project = findProjectById(projects, slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailView project={project} />;
}
