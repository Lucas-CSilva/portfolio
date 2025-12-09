import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard(project: Project) {
  return (
    <Card 
      isPressable
      isHoverable
      shadow="sm"
      className="h-full"
      classNames={{
        base: "border border-divider bg-content1/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className="flex-col items-start gap-4 pb-0">
        <div className="flex justify-between items-start gap-4 w-full">
          <h3 className="text-xl font-bold tracking-tight leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-default-400 transition-colors duration-300 group-hover:text-primary" />
        </div>
        
        <p className="text-default-500 leading-relaxed text-sm line-clamp-4">
           {project.description}
        </p>
      </CardHeader>
      
      <CardBody className="pt-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} technology={tech} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}