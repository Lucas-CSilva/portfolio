'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface MobileCarouselProps {
  projects: Project[];
}

export function MobileCarousel({ projects }: MobileCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: false,
    loop: false,
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // Listen for select events
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <div role="region" aria-label="Project gallery carousel">
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-4 px-6 touch-pan-y">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-[0_0_85%] min-w-0"
              style={{
                scrollSnapAlign: 'start',
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

      {/* Position Indicators with live region */}
      <div
        role="group"
        aria-label="Carousel navigation"
        className="flex justify-center gap-2 mt-6"
      >
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Showing project {selectedIndex + 1} of {projects.length}
        </div>
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1} of ${projects.length}`}
            aria-current={selectedIndex === index ? 'true' : 'false'}
            className={`w-2 h-2 rounded-full transition-all ${
              selectedIndex === index
                ? 'bg-accent-primary w-6'
                : 'bg-border-default hover:bg-text-muted'
            }`}
          />
        ))}
      </div>

      {/* Visual feedback for endpoints */}
      {!canScrollPrev && (
        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none bg-gradient-to-r from-app-bg/50 to-transparent" />
      )}
      {!canScrollNext && (
        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-app-bg/50 to-transparent" />
      )}
    </div>
  );
}
