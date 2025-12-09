import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import { Card, CardBody, Link } from "@heroui/react";
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard(project: Project) {
  return (
    <Link
      href={project.liveUrl || project.repoUrl || '#'}
      isExternal={!!(project.liveUrl || project.repoUrl)}
      className="group block h-full"
    >
      <Card 
        shadow="none"
        className="h-full border border-divider hover:border-accent-primary/30 bg-content1/50 backdrop-blur-sm transition-all duration-200"
      >
        <CardBody className="p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent-primary transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-default-500 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-default-400 group-hover:text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-divider">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} technology={tech} />
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-default-400 self-center">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}