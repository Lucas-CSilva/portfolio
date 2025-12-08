# Implementation Plan: Nord Portfolio SPA

**Branch**: `001-nord-portfolio-spa` | **Date**: 2025-12-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-nord-portfolio-spa/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a high-performance single-page portfolio application using Next.js App Router with strict adherence to the Nord design system. The portfolio features a hero section, an adaptive project gallery (CSS Grid on desktop, Embla Carousel on mobile), technology-based filtering with URL-first state management, and flicker-free theme switching between light and dark modes. The architecture prioritizes Server Components, achieving Core Web Vitals targets while maintaining full accessibility compliance.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)  
**Primary Dependencies**: Next.js 16.x (App Router), React 19.x, Tailwind CSS 4.x, embla-carousel-react, next-themes  
**Storage**: Browser localStorage (theme preferences), static TypeScript files (project data)  
**Testing**: Not specified in requirements - focus on Lighthouse metrics and manual QA  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions), responsive design (mobile-first)  
**Project Type**: Web application (single-page, Next.js App Router)  
**Performance Goals**: LCP <2.5s, FID <100ms, CLS <0.1, Lighthouse Performance >90  
**Constraints**: Server Components by default, Nord color palette exclusively, URL-first state, zero FOUC  
**Scale/Scope**: 6-20 projects, 8-15 unique technologies, single-page portfolio, static generation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Integridade do Design System Nord

**Requirement**: All colors must use Nord theme variables (nord0-nord15) exclusively - no arbitrary hex codes.

**Compliance**: ✅ PASS
- Design will use semantic CSS custom properties mapped to Nord colors
- Tailwind configuration will extend with Nord palette only
- Code review checklist includes color variable verification

**Verification Method**: Grep codebase for hex color patterns (`#[0-9A-Fa-f]{3,6}`) outside of theme configuration files.

### II. Arquitetura Next.js App Router & Server-First

**Requirement**: Server Components by default. `'use client'` only in leaf components requiring interactivity.

**Compliance**: ✅ PASS
- Page and layout components are Server Components
- Only these leaf components will use `'use client'`:
  - `<ThemeToggle>` (needs onClick, useTheme hook)
  - `<FilterControls>` (needs onClick, useRouter, useSearchParams)
  - `<MobileCarousel>` (needs Embla hooks, touch events)
- All other components (Hero, ProjectCard, etc.) remain Server Components

**Verification Method**: Code review ensures `'use client'` only appears in designated leaf components.

### III. Estado na URL (URL-First State)

**Requirement**: Application state reflected in URL. No `useState` for persistent/shareable data.

**Compliance**: ✅ PASS
- Technology filters managed via `useSearchParams()` with query string updates
- No `useState` for filter values - only for transient UI (carousel position indicators, theme toggle animation)
- Browser history navigation supported via URL parameter changes

**Verification Method**: Code review verifies filter state uses `searchParams` prop and `useRouter().replace()` for updates.

### Governance Compliance

**Accessibility**: ✅ PASS - Planned
- All interactive elements will have visible focus states (WCAG AA 3:1 contrast)
- Keyboard navigation supported with logical tab order
- ARIA labels and roles for theme toggle, filters, carousel

**Dependencies**: ✅ PASS
- `embla-carousel-react`: Headless carousel library (pre-approved, ~15KB gzipped)
- `next-themes`: Lightweight theme management (~3KB gzipped), prevents FOUC
- No other external UI libraries

**Code Quality**: ✅ PASS
- TypeScript strict mode already enabled in `tsconfig.json`
- ESLint configuration present with Next.js recommended rules

**Gate Status**: ✅ ALL GATES PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

## Project Structure

### Documentation (this feature)

```text
specs/001-nord-portfolio-spa/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── project-data-schema.ts   # TypeScript interface definitions
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout (Server Component) - theme provider setup
│   ├── page.tsx                      # Home page (Server Component) - renders hero + projects
│   ├── globals.css                   # Global styles, Nord CSS variables, Tailwind imports
│   └── providers.tsx                 # 'use client' - ThemeProvider wrapper only
├── components/
│   ├── hero/
│   │   └── Hero.tsx                  # Server Component - hero section
│   ├── projects/
│   │   ├── ProjectsSection.tsx       # Server Component - main projects container
│   │   ├── ProjectCard.tsx           # Server Component - individual project card
│   │   ├── ProjectGallery.tsx        # Server Component - handles grid/carousel switch logic
│   │   ├── FilterControls.tsx        # 'use client' - filter buttons with URL state
│   │   └── MobileCarousel.tsx        # 'use client' - Embla carousel wrapper
│   ├── theme/
│   │   └── ThemeToggle.tsx           # 'use client' - theme switcher button
│   └── ui/
│       ├── TechBadge.tsx             # Server Component - technology tag display
│       └── EmptyState.tsx            # Server Component - "no projects found" message
├── lib/
│   ├── projects.ts                   # Project data and filtering logic
│   ├── technologies.ts               # Technology extraction and counting utilities
│   └── types.ts                      # Shared TypeScript types
└── data/
    └── projects.ts                   # Static project data (array of project objects)

public/
├── images/
│   └── projects/                     # Project images (WebP format)
└── favicon.ico

tailwind.config.ts                    # Tailwind configuration with Nord theme colors
postcss.config.mjs                    # PostCSS configuration
```

**Structure Decision**: Using Next.js App Router structure with `src/app/` for routing and `src/components/` for reusable UI. This follows Next.js 13+ conventions and separates concerns cleanly:

- **`app/`**: Route-based files (layout, page) as Server Components
- **`components/`**: Organized by feature (hero, projects, theme, ui) with clear Server/Client boundaries
- **`lib/`**: Business logic and utilities (pure functions, no UI)
- **`data/`**: Static content (project definitions)

The structure supports the Server-First principle by keeping most components outside `app/` as Server Components by default, with explicit `'use client'` only for interactive leaves.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**Status**: No violations detected. All constitutional principles are followed without compromise.

## Architecture Decisions

### Design System: Nord Theme Integration

**Approach**: Semantic CSS Custom Properties Layer

```css
/* globals.css */
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
  --nord11: #bf616a;  /* Red */
  --nord12: #d08770;  /* Orange */
  --nord13: #ebcb8b;  /* Yellow */
  --nord14: #a3be8c;  /* Green */
  --nord15: #b48ead;  /* Purple */
  
  /* Semantic tokens - Light theme */
  --bg-app: var(--nord6);
  --bg-surface: var(--nord5);
  --bg-elevated: var(--nord4);
  --text-primary: var(--nord0);
  --text-secondary: var(--nord3);
  --text-muted: var(--nord2);
  --border-default: var(--nord4);
  --accent-primary: var(--nord10);
  --accent-hover: var(--nord9);
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
}
```

**Rationale**:
- Semantic naming (`--bg-app`, `--text-primary`) abstracts intent from color
- Theme switching updates one class (`.dark`) on `<html>`, all variables cascade
- Tailwind can reference these variables: `bg-[var(--bg-app)]` or custom utilities
- Guarantees all colors derive from Nord palette (no arbitrary values possible)

**Tailwind Configuration**:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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

### Theme Management: next-themes

**Approach**: Use `next-themes` for SSR-compatible theme switching without FOUC.

**Implementation Pattern**:

```tsx
// src/app/providers.tsx
'use client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

// src/app/layout.tsx (Server Component)
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Why next-themes**:
- Injects blocking script to read theme preference before paint (prevents FOUC)
- Respects `prefers-color-scheme` media query for system theme
- Handles localStorage persistence automatically
- ~3KB gzipped, zero dependencies beyond React

**Alternative Rejected**: Manual implementation would require duplicating FOUC prevention logic and localStorage management.

### URL-First State: Filter Management

**Approach**: Use `useSearchParams` + `useRouter` for filter state in URL.

**Implementation Pattern**:

```tsx
// src/components/projects/FilterControls.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function FilterControls({ technologies }: { technologies: TechCount[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTech = searchParams.get('tech');
  
  const handleFilter = (tech: string) => {
    const params = new URLSearchParams(searchParams);
    if (activeTech === tech) {
      params.delete('tech'); // Toggle off
    } else {
      params.set('tech', tech); // Set new filter
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
  };
  
  return (/* filter buttons */);
}

// src/app/page.tsx (Server Component)
export default function HomePage({ searchParams }: { searchParams: { tech?: string } }) {
  const filteredProjects = searchParams.tech
    ? projects.filter(p => p.technologies.includes(searchParams.tech))
    : projects;
  
  return <ProjectsSection projects={filteredProjects} />;
}
```

**Benefits**:
- URL is source of truth: `/?tech=react` loads filtered view directly
- Browser back/forward works automatically
- Shareable/bookmarkable filtered states
- No useState needed - respects constitution

### Responsive Gallery: CSS Grid + Embla Carousel

**Approach**: Conditional rendering based on viewport, not runtime detection.

**Implementation Pattern**:

```tsx
// src/components/projects/ProjectGallery.tsx (Server Component)
export function ProjectGallery({ projects }: { projects: Project[] }) {
  return (
    <>
      {/* Desktop: CSS Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => <ProjectCard key={project.id} {...project} />)}
      </div>
      
      {/* Mobile: Embla Carousel */}
      <div className="md:hidden">
        <MobileCarousel projects={projects} />
      </div>
    </>
  );
}

// src/components/projects/MobileCarousel.tsx ('use client')
'use client';
import useEmblaCarousel from 'embla-carousel-react';

export function MobileCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
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

**Why This Approach**:
- Desktop users never load carousel JavaScript (Server Component)
- Mobile users never execute grid layout code
- Tailwind's `md:` breakpoint (768px) handles visibility
- Embla Carousel is headless, lightweight (~15KB), and touch-native

**Alternative Rejected**: Single component with runtime detection would force client boundary up the tree, violating Server-First principle.

### Performance: Image Optimization

**Approach**: Next.js Image component with lazy loading for below-fold content.

```tsx
// src/components/projects/ProjectCard.tsx
import Image from 'next/image';

export function ProjectCard({ title, image, description, technologies }: Project) {
  return (
    <article>
      <Image
        src={`/images/projects/${image}`}
        alt={title}
        width={800}
        height={600}
        loading="lazy"
        placeholder="blur"
        blurDataURL={`/images/projects/${image}?blur`}
      />
      {/* card content */}
    </article>
  );
}
```

**Benefits**:
- Automatic WebP/AVIF generation
- Lazy loading for below-fold images (LCP optimization)
- Responsive srcset generation
- Blur placeholder during load (CLS mitigation)

## Phase 0: Research

### Research Topics

The following areas require investigation to finalize implementation details:

1. **Embla Carousel Configuration**
   - Best practices for snap alignment and scrolling behavior
   - Accessibility patterns for carousel position indicators
   - Performance implications of different plugin configurations

2. **next-themes Setup**
   - Optimal placement of ThemeProvider in App Router
   - Script injection mechanism for FOUC prevention
   - Testing theme persistence across page reloads

3. **Nord Color Contrast Testing**
   - Verify WCAG AA compliance for all text/background combinations
   - Test focus indicator visibility in both themes
   - Document approved color pairings for future development

4. **Tailwind 4 CSS Variables**
   - Confirm CSS variable reference syntax in Tailwind 4
   - Test theme switching performance with CSS variables
   - Validate HMR behavior with custom properties

5. **Next.js Image Optimization**
   - Optimal image dimensions for project cards
   - WebP generation configuration
   - Blur placeholder generation strategy

### Research Output

Research findings will be documented in `research.md` with the following structure:
- Decision made
- Rationale (why this approach)
- Alternatives considered
- Implementation notes


## Phase 1 Complete: Constitution Re-Check

*GATE: Must pass after Phase 1 design before proceeding to Phase 2 (tasks)*

### Re-verification After Design

**I. Integridade do Design System Nord**: ??? PASS
- All color definitions use Nord variables in `globals.css`
- Tailwind configuration references CSS variables only
- No arbitrary hex codes in component patterns
- Semantic naming layer (`--bg-app`, `--text-primary`) enforces Nord palette

**II. Arquitetura Next.js App Router & Server-First**: ??? PASS
- Architecture decisions document 3 client components only:
  - `ThemeToggle.tsx`
  - `FilterControls.tsx`
  - `MobileCarousel.tsx`
- All other components (Hero, ProjectCard, ProjectGallery, etc.) are Server Components
- Page component in `app/page.tsx` is Server Component receiving searchParams

**III. Estado na URL (URL-First State)**: ??? PASS
- Filter implementation uses `useSearchParams()` and `useRouter().replace()`
- Server Component receives filter via searchParams prop
- No useState for filter values - only URL is source of truth
- Browser history works automatically via URL parameters

### Final Gate Status

??? **ALL CONSTITUTIONAL PRINCIPLES VERIFIED**

**Phase 1 Output Summary**:
- `research.md`: 5 research areas completed with decisions documented
- `data-model.md`: 4 entities defined with validation rules
- `contracts/types.ts`: TypeScript interfaces and constants
- `quickstart.md`: Developer setup guide and implementation patterns

**Next Command**: `/speckit.tasks` to generate Phase 2 task breakdown

---

**Implementation Plan Complete** | **Date**: 2025-12-08 | **Status**: Ready for Phase 2
