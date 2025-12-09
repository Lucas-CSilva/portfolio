'use client';

import * as React from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@heroui/react';

const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Featured', href: '#featured' },
    { name: 'Projects', href: '#gallery' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <Navbar 
            isBlurred={false}
            isBordered={isScrolled}
            maxWidth="xl"
            position="sticky"
            height="5rem"
            classNames={{
                base: `transition-all duration-200 ${
                    isScrolled 
                        ? 'bg-app-bg/80 backdrop-blur-xl backdrop-saturate-150 border-b border-divider/50' 
                        : 'bg-transparent'
                }`,
                wrapper: 'px-6 lg:px-8 max-w-7xl',
                item: 'data-[active=true]:font-semibold',
            }}
        >
            <NavbarBrand>
                <Link 
                    href="/"
                    color="foreground"
                    className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity"
                    underline="none"
                >
                    Lucas Silva
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden md:flex gap-8" justify="center">
                {navigation.map((item) => (
                    <NavbarItem key={item.name}>
                        <Link
                            href={item.href}
                            color="foreground"
                            onPress={(e) => handleNavClick(e as any, item.href)}
                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                            underline="none"
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
