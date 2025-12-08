'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileCarouselProps {
  projects: Project[];
}

export function MobileCarousel({ projects }: MobileCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'center',
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (projects.length === 0) return null;

  return (
    <div className="relative flex flex-col gap-6">
      {/* Viewport do Carrossel */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_60%]"
            >
              <div className="h-full transform transition-transform duration-300 hover:scale-[1.02]">
                <ProjectCard {...project} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores (Dots) */}
      <div className="flex justify-center items-center gap-1.5 py-2">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => scrollTo(index)}
            aria-label={`Ir para projeto ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : 'false'}
            className={cn(
              "h-2.5 w-2.5 rounded-full p-0 hover:bg-primary/50 transition-all duration-300",
              index === selectedIndex 
                ? "bg-primary w-6" // Active: Nord10 (Blue) + Largura expandida
                : "bg-muted-foreground/30" // Inactive: Tom suave
            )}
          />
        ))}
      </div>
    </div>
  );
}