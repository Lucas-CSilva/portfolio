'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
            className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                                Olá, sou{' '}
                                <span className="text-primary">
                                    Lucas Silva
                                </span>
                            </h1>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground">
                                Frontend Developer & UI/UX Enthusiast
                            </h2>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Especializado em criar experiências web modernas e performáticas
                            usando React, Next.js e TypeScript. Apaixonado por design systems,
                            acessibilidade e código limpo.
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="default"
                                size="lg"
                                asChild
                                className="group"
                            >
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    GitHub
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="group"
                            >
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    LinkedIn
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="group"
                            >
                                <a
                                    href="mailto:contato@example.com"
                                    rel="noopener noreferrer"
                                >
                                    <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Email
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* About Me Card */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="text-2xl font-bold text-foreground">
                                Sobre Mim
                            </h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Com mais de X anos de experiência no desenvolvimento web,
                                    tenho focado em criar interfaces intuitivas e acessíveis
                                    que proporcionam experiências excepcionais aos usuários.
                                </p>
                                <p>
                                    Minha abordagem combina design thinking com práticas
                                    modernas de desenvolvimento, sempre buscando performance,
                                    escalabilidade e manutenibilidade do código.
                                </p>
                                <div className="pt-4 border-t border-border">
                                    <h4 className="font-semibold text-foreground mb-3">
                                        Skills Principais
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            'React',
                                            'Next.js',
                                            'TypeScript',
                                            'Tailwind CSS',
                                            'Node.js',
                                            'shadcn/ui',
                                        ].map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={scrollToProjects}
                        className="animate-bounce"
                        aria-label="Scroll to projects"
                    >
                        <ArrowDown className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
