'use client';

import * as React from 'react';
import { Button, Card, CardBody, CardHeader, Chip, Link, Divider } from '@heroui/react';
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
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-default-500">
                                Frontend Developer & UI/UX Enthusiast
                            </h2>
                        </div>

                        <p className="text-lg text-default-500 leading-relaxed">
                            Especializado em criar experiências web modernas e performáticas
                            usando React, Next.js e TypeScript. Apaixonado por design systems,
                            acessibilidade e código limpo.
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="solid"
                                color="primary"
                                size="lg"
                                as={Link}
                                href="https://github.com"
                                isExternal
                                startContent={<Github className="h-5 w-5" />}
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="bordered"
                                size="lg"
                                as={Link}
                                href="https://linkedin.com"
                                isExternal
                                startContent={<Linkedin className="h-5 w-5" />}
                            >
                                LinkedIn
                            </Button>
                            <Button
                                variant="bordered"
                                size="lg"
                                as={Link}
                                href="mailto:contato@example.com"
                                startContent={<Mail className="h-5 w-5" />}
                            >
                                Email
                            </Button>
                        </div>
                    </div>

                    {/* About Me Card */}
                    <Card shadow="lg" isBlurred>
                        <CardHeader>
                            <h3 className="text-2xl font-bold">
                                Sobre Mim
                            </h3>
                        </CardHeader>
                        <CardBody className="space-y-6">
                            <div className="space-y-4 text-default-500">
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
                            </div>
                            
                            <Divider />
                            
                            <div>
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
                                        <Chip
                                            key={skill}
                                            color="primary"
                                            variant="flat"
                                            size="md"
                                        >
                                            {skill}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <Button
                        variant="light"
                        size="lg"
                        isIconOnly
                        onPress={scrollToProjects}
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
