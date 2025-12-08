import type { Project } from '@/lib/types';

/**
 * Mock project data for portfolio gallery
 * Order: Lower number = higher priority in display
 */
export const projects: Project[] = [
    {
        id: 'ecommerce-platform',
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce solution built with Next.js and Stripe. Features include product catalog, shopping cart, and secure checkout with real-time inventory management.',
        technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
        order: 1,
        featured: true,
    },
    {
        id: 'task-management-app',
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates. Supports team workspaces, drag-and-drop prioritization, and deadline tracking.',
        technologies: ['React', 'TypeScript', 'Firebase', 'Material UI'],
        order: 2,
        featured: true,
    },
    {
        id: 'weather-dashboard',
        title: 'Weather Dashboard',
        description: 'Interactive weather dashboard displaying current conditions and forecasts. Includes location-based weather, hourly predictions, and weather alerts.',
        technologies: ['React', 'TypeScript', 'OpenWeather API', 'Recharts'],
        order: 3,
    },
    {
        id: 'blog-cms',
        title: 'Headless Blog CMS',
        description: 'Headless content management system for blogs with markdown support. Features rich text editing, image optimization, and SEO meta management.',
        technologies: ['Next.js', 'TypeScript', 'MDX', 'Contentful'],
        order: 4,
    },
    {
        id: 'portfolio-generator',
        title: 'Portfolio Generator',
        description: 'CLI tool to generate static portfolio sites from JSON configuration. Supports multiple themes, automatic image optimization, and GitHub Pages deployment.',
        technologies: ['Node.js', 'TypeScript', 'Commander', 'Sharp'],
        order: 5,
    },
    {
        id: 'api-documentation',
        title: 'API Documentation Tool',
        description: 'Interactive API documentation generator with live testing playground. Auto-generates docs from OpenAPI specs with code examples in multiple languages.',
        technologies: ['React', 'TypeScript', 'OpenAPI', 'Monaco Editor'],
        order: 6,
    },
    {
        id: 'data-visualization',
        title: 'Data Visualization Dashboard',
        description: 'Real-time data visualization dashboard for analytics. Includes customizable charts, data filtering, export functionality, and responsive design.',
        technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
        order: 7,
    },
    {
        id: 'chat-application',
        title: 'Real-Time Chat Application',
        description: 'WebSocket-based chat application with group channels and direct messaging. Features include emoji reactions, file sharing, and message search.',
        technologies: ['React', 'TypeScript', 'Socket.io', 'Express'],
        order: 8,
    },
];
