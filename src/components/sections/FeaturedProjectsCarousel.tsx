'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';

interface FeaturedProjectsCarouselProps {
    projects: Project[];
}

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const featuredProjects = projects.filter((p) => p.featured);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <section
            id="featured"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        >
            <div className="container mx-auto max-w-6xl">
                <div className="space-y-4 text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                        Projetos em Destaque
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Uma seleção dos meus trabalhos mais relevantes e impactantes
                    </p>
                </div>

                <div className="relative">
                    <Carousel
                        setApi={setApi}
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {featuredProjects.map((project) => (
                                <CarouselItem key={project.id}>
                                    <Card className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg">
                                        <CardHeader className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2 flex-1">
                                                    <CardTitle className="text-3xl">
                                                        {project.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-base">
                                                        {project.context}
                                                    </CardDescription>
                                                </div>
                                                {project.liveUrl && (
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                        className="shrink-0 ml-4"
                                                    >
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`View ${project.title} live`}
                                                        >
                                                            <ExternalLink className="h-5 w-5" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Technologies */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                                    Stack Tecnológica
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech) => (
                                                        <TechBadge
                                                            key={tech}
                                                            technology={tech}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Links */}
                                            {(project.repoUrl || project.liveUrl) && (
                                                <div className="flex gap-3 pt-4 border-t border-border">
                                                    {project.repoUrl && (
                                                        <Button
                                                            variant="outline"
                                                            asChild
                                                            className="flex-1"
                                                        >
                                                            <a
                                                                href={project.repoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                View Code
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.liveUrl && (
                                                        <Button
                                                            variant="default"
                                                            asChild
                                                            className="flex-1"
                                                        >
                                                            <a
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                View Live
                                                                <ExternalLink className="ml-2 h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index + 1 === current
                                        ? 'w-8 bg-primary'
                                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
