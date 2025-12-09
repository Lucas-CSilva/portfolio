'use client';

import * as React from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@heroui/react';

const navigation = [
    { name: 'About Me', href: '#about' },
    { name: 'Destaques', href: '#featured' },
    { name: 'Galeria', href: '#gallery' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
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
            isBlurred={isScrolled}
            isBordered={isScrolled}
            maxWidth="xl"
            position="sticky"
            classNames={{
                base: 'transition-all duration-300',
                wrapper: 'px-4 sm:px-6 lg:px-8',
            }}
        >
            <NavbarBrand>
                <Link 
                    href="/"
                    color="foreground"
                    className="font-bold text-xl"
                >
                    Portfolio
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden md:flex gap-1" justify="center">
                {navigation.map((item) => (
                    <NavbarItem key={item.name}>
                        <Link
                            href={item.href}
                            color="foreground"
                            onPress={(e) => handleNavClick(e as any, item.href)}
                            className="font-medium"
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
