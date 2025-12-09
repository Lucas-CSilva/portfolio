'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

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
        <header
            className={cn(
                'sticky top-0 z-50 w-full transition-all duration-300',
                isScrolled
                    ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
                        >
                            Portfolio
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {navigation.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <Link href={item.href} legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                        >
                                            {item.name}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Theme Toggle */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-around py-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
