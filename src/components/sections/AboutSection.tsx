'use client';

import * as React from 'react';
import { Button, Card, CardBody, Chip, Link, Divider } from '@heroui/react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export function AboutSection() {
    const scrollToProjects = () => {
        const target = document.querySelector('#featured');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center py-32"
        >
            <div className="page-container">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
                    {/* Hero Content - Professional & Clean */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-sm font-medium tracking-wide uppercase text-accent-primary">
                                    Software Engineer
                                </p>
                                <h1 className="text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
                                    Lucas Silva
                                </h1>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-normal text-default-600 leading-relaxed max-w-xl">
                                Building modern web experiences with precision and attention to detail
                            </h2>
                        </div>

                        <p className="text-base text-default-500 leading-relaxed max-w-xl">
                            Specialized in creating scalable frontend architectures using React, Next.js, and TypeScript. 
                            Focused on design systems, performance optimization, and delivering enterprise-grade solutions.
                        </p>

                        {/* Social Links - Minimal & Professional */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="bordered"
                                size="md"
                                as={Link}
                                href="https://github.com"
                                isExternal
                                startContent={<Github className="h-4 w-4" />}
                                className="font-medium"
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="bordered"
                                size="md"
                                as={Link}
                                href="https://linkedin.com"
                                isExternal
                                startContent={<Linkedin className="h-4 w-4" />}
                                className="font-medium"
                            >
                                LinkedIn
                            </Button>
                            <Button
                                variant="bordered"
                                size="md"
                                as={Link}
                                href="mailto:contato@example.com"
                                startContent={<Mail className="h-4 w-4" />}
                                className="font-medium"
                            >
                                Contact
                            </Button>
                        </div>
                    </div>

                    {/* About Card - Premium Enterprise Style */}
                    <Card 
                        shadow="none"
                        className="border border-divider bg-content1/50 backdrop-blur-sm"
                    >
                        <CardBody className="p-8 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold tracking-tight">
                                    Professional Background
                                </h3>
                                <div className="space-y-4 text-sm text-default-600 leading-relaxed">
                                    <p>
                                        Experienced frontend engineer with a proven track record of delivering 
                                        high-quality web applications for diverse industries and scales.
                                    </p>
                                    <p>
                                        My approach combines technical excellence with user-centric design, 
                                        ensuring solutions that are both performant and accessible.
                                    </p>
                                </div>
                            </div>
                            
                            <Divider />
                            
                            <div className="space-y-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-default-500">
                                    Core Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'React',
                                        'Next.js',
                                        'TypeScript',
                                        'Tailwind CSS',
                                        'Node.js',
                                    ].map((skill) => (
                                        <Chip
                                            key={skill}
                                            variant="flat"
                                            size="sm"
                                            classNames={{
                                                base: 'bg-default-100 border border-divider',
                                                content: 'text-default-700 font-medium text-xs',
                                            }}
                                        >
                                            {skill}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Scroll Indicator - Subtle */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <Button
                        variant="light"
                        size="sm"
                        isIconOnly
                        onPress={scrollToProjects}
                        className="text-default-400 hover:text-default-600 animate-bounce"
                        aria-label="Scroll to projects"
                    >
                        <ArrowDown className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
