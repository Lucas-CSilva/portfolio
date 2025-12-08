# Quickstart: Nord Portfolio SPA

**Feature**: 001-nord-portfolio-spa  
**Date**: 2025-12-08  
**Purpose**: Guide developers through setup and implementation patterns

## Prerequisites

Before starting implementation, ensure:

- [x] Node.js 18+ installed
- [x] pnpm package manager installed (or npm/yarn)
- [x] Git repository initialized
- [x] Basic familiarity with Next.js App Router
- [x] TypeScript understanding

## Installation

### 1. Install Dependencies

```bash
# Install required packages
pnpm add next-themes embla-carousel-react

# Verify package.json includes:
# - next@16.x
# - react@19.x
# - typescript@5.x
# - tailwindcss@4.x
```

### 2. Configure TypeScript

Ensure `tsconfig.json` has strict mode enabled:

```jsonc
{
  "compilerOptions": {
    "strict": true,  // ✅ Required by constitution
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]  // ✅ Enables absolute imports
    }
  }
}
```

### 3. Configure Tailwind CSS

Update `tailwind.config.ts` with Nord theme:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',  // ✅ Required for next-themes
  theme: {
    extend: {
      colors: {
        // Semantic color tokens
        app: {
          bg: 'var(--bg-app)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
        },
        border: {
          default: 'var(--border-default)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4. Create Nord CSS Variables

Create `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Nord Polar Night (Dark) */
  --nord0: #2e3440;
  --nord1: #3b4252;
  --nord2: #434c5e;
  --nord3: #4c566a;
  
  /* Nord Snow Storm (Light) */
  --nord4: #d8dee9;
  --nord5: #e5e9f0;
  --nord6: #eceff4;
  
  /* Nord Frost (Blue accent) */
  --nord7: #8fbcbb;
  --nord8: #88c0d0;
  --nord9: #81a1c1;
  --nord10: #5e81ac;
  
  /* Nord Aurora (Color accents) */
  --nord11: #bf616a;
  --nord12: #d08770;
  --nord13: #ebcb8b;
  --nord14: #a3be8c;
  --nord15: #b48ead;
  
  /* Semantic tokens - Light theme (default) */
  --bg-app: var(--nord6);
  --bg-surface: var(--nord5);
  --bg-elevated: var(--nord4);
  --text-primary: var(--nord0);
  --text-secondary: var(--nord3);
  --text-muted: var(--nord2);
  --border-default: var(--nord4);
  --accent-primary: var(--nord10);
  --accent-hover: var(--nord9);
  --focus-ring: var(--nord8);
}

.dark {
  /* Semantic tokens - Dark theme */
  --bg-app: var(--nord0);
  --bg-surface: var(--nord1);
  --bg-elevated: var(--nord2);
  --text-primary: var(--nord6);
  --text-secondary: var(--nord4);
  --text-muted: var(--nord5);
  --border-default: var(--nord2);
  --accent-primary: var(--nord8);
  --accent-hover: var(--nord7);
  --focus-ring: var(--nord9);
}

/* Global focus styles */
*:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease;
}
```

## Implementation Patterns

### Pattern 1: Server Component (Default)

**When to use**: Any component that doesn't need interactivity

```tsx
// src/components/hero/Hero.tsx
// ✅ No 'use client' directive = Server Component

export function Hero() {
  return (
    <section className="bg-app-bg text-text-primary min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">
          Your Name
        </h1>
        <p className="text-xl text-text-secondary">
          Full Stack Developer
        </p>
      </div>
    </section>
  );
}
```

### Pattern 2: Client Component (Leaf Only)

**When to use**: Component needs event handlers, hooks, or browser APIs

```tsx
// src/components/theme/ThemeToggle.tsx
'use client';  // ✅ Only in leaf components

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-app-elevated hover:bg-accent-primary"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### Pattern 3: URL-First State (Filters)

**Server Component** receives searchParams:

```tsx
// src/app/page.tsx
import { projects } from '@/data/projects';
import { ProjectsSection } from '@/components/projects/ProjectsSection';

interface PageProps {
  searchParams: { tech?: string };
}

export default function HomePage({ searchParams }: PageProps) {
  const filteredProjects = searchParams.tech
    ? projects.filter(p => 
        p.technologies.some(t => 
          t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === searchParams.tech
        )
      )
    : projects;
  
  return <ProjectsSection projects={filteredProjects} />;
}
```

**Client Component** updates URL:

```tsx
// src/components/projects/FilterControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function FilterControls({ technologies }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTech = searchParams.get('tech');
  
  const handleFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (activeTech === slug) {
      params.delete('tech');  // Toggle off
    } else {
      params.set('tech', slug);  // Set filter
    }
    
    router.replace(`/?${params.toString()}`, { scroll: false });
  };
  
  return (/* filter UI */);
}
```

### Pattern 4: Responsive Gallery

**Conditional rendering based on viewport**:

```tsx
// src/components/projects/ProjectGallery.tsx
// ✅ Server Component

import { ProjectCard } from './ProjectCard';
import { MobileCarousel } from './MobileCarousel';

export function ProjectGallery({ projects }) {
  return (
    <>
      {/* Desktop: CSS Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} {...project} index={index} />
        ))}
      </div>
      
      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <MobileCarousel projects={projects} />
      </div>
    </>
  );
}
```

**Carousel implementation**:

```tsx
// src/components/projects/MobileCarousel.tsx
'use client';  // ✅ Needs Embla hooks

import useEmblaCarousel from 'embla-carousel-react';

export function MobileCarousel({ projects }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });
  
  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex gap-4">
        {projects.map(project => (
          <div key={project.id} className="flex-[0_0_85%]">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pattern 5: Theme Provider Setup

**Root layout** (Server Component):

```tsx
// src/app/layout.tsx
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-app-bg text-text-primary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**Providers** (Client Component):

```tsx
// src/app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      storageKey="portfolio-theme"
    >
      {children}
    </ThemeProvider>
  );
}
```

## Project Data Structure

### Create Sample Data

```typescript
// src/data/projects.ts
import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js App Router and Nord theme. Features server-first architecture and URL-based filtering.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    image: "portfolio.webp",
    order: 1,
    featured: true,
  },
  // Add 5+ more projects...
];
```

### Create Type Definitions

```typescript
// src/lib/types.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  blurDataURL?: string;
  liveUrl?: string;
  repoUrl?: string;
  order: number;
  featured?: boolean;
}

export interface Technology {
  name: string;
  count: number;
  slug: string;
}
```

## Common Tasks

### Add a New Project

1. Edit `src/data/projects.ts`
2. Add project object with required fields
3. Add project image to `public/images/projects/`
4. Rebuild application

### Add a New Component

1. Determine if interactive (needs `'use client'`)
2. Create in appropriate `src/components/` subdirectory
3. Import types from `@/lib/types`
4. Use semantic color classes (`bg-app-bg`, `text-text-primary`)

### Test Theme Switching

```bash
# 1. Start dev server
pnpm dev

# 2. Open http://localhost:3000
# 3. Click theme toggle
# 4. Verify no FOUC on page reload
# 5. Check browser localStorage for "portfolio-theme" key
```

### Test URL Filtering

```bash
# 1. Click any technology filter
# 2. Verify URL updates (e.g., /?tech=nextjs)
# 3. Copy URL and open in new tab
# 4. Verify filter is applied on load
# 5. Test browser back/forward buttons
```

## Performance Checklist

Before deploying, verify:

- [ ] Run `pnpm build` successfully
- [ ] Check bundle size: `<100KB gzipped`
- [ ] Run Lighthouse audit: Performance >90
- [ ] Test on 3G throttling: LCP <2.5s
- [ ] Verify no layout shift (CLS <0.1)
- [ ] Test theme toggle: No flicker
- [ ] Test mobile carousel: 60fps scrolling
- [ ] Verify all images use Next/Image with lazy loading

## Troubleshooting

### Theme Flickers on Load

**Problem**: Wrong theme shows briefly before correct theme loads

**Solution**: Ensure `suppressHydrationWarning` on `<html>` element

```tsx
<html lang="en" suppressHydrationWarning>
```

### Carousel Not Working on Mobile

**Problem**: Carousel doesn't respond to touch gestures

**Solution**: Verify `overflow-hidden` on container and `'use client'` directive

### Filter URL Not Updating

**Problem**: Clicking filter doesn't update URL

**Solution**: Check `useRouter` and `useSearchParams` imports from `'next/navigation'` (not `'next/router'`)

### Colors Not Switching with Theme

**Problem**: Some elements don't update when theme changes

**Solution**: Ensure using CSS variable classes (`bg-app-bg`) not hard-coded Tailwind colors (`bg-gray-100`)

## Next Steps

After completing quickstart setup:

1. **Phase 2**: Review tasks in `tasks.md` (run `/speckit.tasks`)
2. **Implementation**: Follow task list for systematic development
3. **Testing**: Verify each user story independently
4. **Deploy**: Push to Vercel/Netlify for production deployment

## Additional Resources

- **Next.js App Router Docs**: https://nextjs.org/docs/app
- **next-themes Documentation**: https://github.com/pacocoursey/next-themes
- **Embla Carousel Docs**: https://www.embla-carousel.com/
- **Nord Theme Specification**: https://www.nordtheme.com/docs/colors-and-palettes
- **WCAG Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

**Ready to implement?** Proceed to Phase 2 by running `/speckit.tasks` to generate the task breakdown.
