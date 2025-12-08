import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';

export function ProjectCard(project: Project) {
  return (
    <article className="bg-app-surface border border-border-default rounded-lg p-6 hover:bg-app-elevated transition-colors">
      <h3 className="text-xl font-semibold text-text-primary mb-3">
        {project.title}
      </h3>
      <p className="text-text-secondary mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <TechBadge key={tech} technology={tech} />
        ))}
      </div>
    </article>
  );
}
