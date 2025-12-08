import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard(project: Project) {
  return (
    <Card className="group relative h-full flex flex-col overflow-hidden border border-border/50 bg-card/30 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header com flex-grow-0 para não esticar, mas com espaçamento generoso */}
      <CardHeader className="relative z-10 p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground leading-snug">
            {project.title}
          </CardTitle>
          <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-muted-foreground/50 transition-colors duration-300 group-hover:text-primary" />
        </div>
        
        {/* Adicionando min-h para garantir alinhamento visual entre cards vizinhos */}
        <CardDescription className="text-muted-foreground/90 leading-relaxed text-sm line-clamp-4">
           {project.description}
        </CardDescription>
      </CardHeader>
      
      {/* Content empurrado para o final com mt-auto */}
      <CardContent className="mt-auto p-6 pt-0 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} technology={tech} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}