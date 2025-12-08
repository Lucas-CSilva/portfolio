import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectCard(project: Project) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all hover:-translate-y-1 border-muted/60">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold text-foreground">
            {project.title}
          </CardTitle>
          {/* Espaço para ícone de link externo futuro */}
        </div>
        <CardDescription className="text-muted-foreground line-clamp-2">
           {/* line-clamp ajuda a manter altura uniforme nos cards */}
           {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="mt-auto pt-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} technology={tech} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}