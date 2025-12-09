'use client';

import * as React from 'react';
import { Card, CardBody, Button, Link } from '@heroui/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { ExternalLink, Github } from 'lucide-react';
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
        Autoplay({ delay: 6000, stopOnInteraction: true })
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
            className="py-32 bg-default-50/30"
        >
            <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                <div className="space-y-3 text-center mb-16">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                        Portfolio Highlights
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                        Featured Projects
                    </h2>
                    <p className="text-base text-default-500 max-w-2xl mx-auto">
                        Selected work showcasing technical excellence and attention to detail
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
                                    <Card 
                                        shadow="none"
                                        className="border border-divider bg-content1/50 backdrop-blur-sm"
                                    >
                                        <CardBody className="p-8 lg:p-12 space-y-8">
                                            <div className="space-y-4">
                                                <div className="flex items-start justify-between gap-6">
                                                    <div className="space-y-2 flex-1">
                                                        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                                                            {project.title}
                                                        </h3>
                                                        {project.context && (
                                                            <p className="text-sm text-default-500 font-medium">
                                                                {project.context}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-base text-default-600 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="text-xs font-semibold uppercase tracking-wider text-default-500">
                                                    Technology Stack
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech) => (
                                                        <TechBadge key={tech} technology={tech} />
                                                    ))}
                                                </div>
                                            </div>

                                            {(project.repoUrl || project.liveUrl) && (
                                                <div className="flex gap-3 pt-4 border-t border-divider">
                                                    {project.repoUrl && (
                                                        <Button
                                                            variant="bordered"
                                                            size="md"
                                                            as={Link}
                                                            href={project.repoUrl}
                                                            isExternal
                                                            startContent={<Github className="h-4 w-4" />}
                                                            className="font-medium"
                                                        >
                                                            View Code
                                                        </Button>
                                                    )}
                                                    {project.liveUrl && (
                                                        <Button
                                                            variant="bordered"
                                                            size="md"
                                                            as={Link}
                                                            href={project.liveUrl}
                                                            isExternal
                                                            startContent={<ExternalLink className="h-4 w-4" />}
                                                            className="font-medium"
                                                        >
                                                            View Live
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </CardBody>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>

                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-1.5 rounded-full transition-all ${
                                    index + 1 === current
                                        ? 'w-8 bg-accent-primary'
                                        : 'w-1.5 bg-default-300 hover:bg-default-400'
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
