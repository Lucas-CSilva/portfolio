# Research: Project Detail Pages with Enhanced Status Display

**Feature**: 002-project-detail-pages  
**Date**: December 13, 2025  
**Phase**: 0 - Research & Clarification

## Purpose

This document consolidates research findings to resolve all NEEDS CLARIFICATION markers from the Technical Context and establish technical patterns for implementation. All decisions are made in the context of the existing portfolio codebase (Next.js 16.0.7 + Tailwind CSS + Material UI with Nord theme).

## Research Tasks

### 1. Testing Strategy for New Components

**Question**: What testing approach should be used for new components?

**Decision**: Manual testing with browser DevTools + TypeScript strict mode

**Rationale**: 
- The portfolio is a personal project with < 100 concurrent users (low risk)
- No existing test infrastructure in the codebase (would require significant setup)
- TypeScript strict mode already provides compile-time type safety
- Manual testing is sufficient for:
  - Visual components (StatusBadge, project cards)
  - Navigation flows (clicking cards, URL routing)
  - Theme integration (light/dark mode)
  - Responsive layouts (mobile/tablet/desktop)

**Alternatives Considered**:
- **Jest + React Testing Library**: Rejected - Would require installing testing dependencies, configuring Jest for Next.js 16, and writing tests for existing components to establish patterns. Overhead not justified for feature scope.
- **Playwright E2E tests**: Rejected - Overkill for a static portfolio site with simple navigation. Best suited for complex user flows with state management.
- **Vitest**: Rejected - While faster than Jest, still requires initial setup and test writing that doesn't align with project's immediate needs.

**Verification Plan**:
- Test status badge colors in both light/dark themes
- Verify clickable cards navigate to correct URLs
- Test deep-linking to project detail pages
- Verify 404 handling for invalid slugs
- Check responsive behavior on mobile/tablet/desktop
- Validate keyboard navigation and focus states
- Test browser back/forward navigation

---

### 2. Next.js App Router Dynamic Routes Best Practices

**Question**: What is the optimal pattern for implementing `/projects/[slug]` route with data fetching?

**Decision**: Use Next.js 16 dynamic segments with server-side data fetching in page component

**Rationale**:
- Next.js App Router provides native dynamic routing via file system (e.g., `app/projects/[slug]/page.tsx`)
- Server Components (default in App Router) enable zero-client-JavaScript data fetching
- Static project data in `src/data/projects.ts` can be imported directly in page component
- No need for `getServerSideProps` or `getStaticProps` (App Router paradigm)

**Implementation Pattern**:
```typescript
// app/projects/[slug]/page.tsx (Server Component)
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => generateSlug(p.title) === params.slug);
  
  if (!project) {
    notFound(); // Triggers app/projects/[slug]/not-found.tsx
  }
  
  return <ProjectDetailView project={project} />;
}

// Generate static params for build-time optimization
export async function generateStaticParams() {
  return projects.map(p => ({ slug: generateSlug(p.title) }));
}
```

**Alternatives Considered**:
- **Client-side routing with useRouter**: Rejected - Violates constitution's server-first principle, adds unnecessary JavaScript to client
- **Numeric IDs in URL** (e.g., `/projects/1`): Rejected - Less SEO-friendly, doesn't match GitHub-style requirement
- **Full project title in URL** (e.g., `/projects/E-Commerce Platform`): Rejected - Not URL-safe, requires encoding

**Best Practices Applied**:
- Use `generateStaticParams()` for static site generation (SSG) at build time
- Implement `notFound()` for 404 handling instead of error boundaries
- Keep page component as Server Component, only child components need `'use client'`
- Use TypeScript `params` type for type safety

---

### 3. URL Slug Generation Algorithm

**Question**: How should project names be converted to URL-safe slugs with collision handling?

**Decision**: Lowercase + hyphenation + special character removal with uniqueness validation

**Rationale**:
- Aligns with GitHub's URL pattern (e.g., `microsoft/vscode` → `vscode`)
- Predictable and deterministic (same input always produces same slug)
- URL-safe without percent-encoding for readability
- Simple collision detection via Set-based uniqueness check

**Implementation Algorithm**:
```typescript
export function generateSlug(title: string): string {
  return title
    .toLowerCase()                    // "E-Commerce Platform" → "e-commerce platform"
    .replace(/[^a-z0-9\s-]/g, '')    // Remove special chars except spaces and hyphens
    .trim()                           // Remove leading/trailing spaces
    .replace(/\s+/g, '-')            // "e-commerce platform" → "e-commerce-platform"
    .replace(/-+/g, '-');            // Collapse multiple hyphens to single hyphen
}

// Uniqueness validation (run at app startup or in tests)
export function validateSlugUniqueness(projects: Project[]): void {
  const slugs = new Set<string>();
  const duplicates: string[] = [];
  
  projects.forEach(project => {
    const slug = generateSlug(project.title);
    if (slugs.has(slug)) {
      duplicates.push(project.title);
    }
    slugs.add(slug);
  });
  
  if (duplicates.length > 0) {
    throw new Error(`Duplicate slugs detected: ${duplicates.join(', ')}`);
  }
}
```

**Edge Cases Handled**:
- Multiple consecutive spaces → single hyphen
- Leading/trailing spaces → trimmed
- Special characters (emojis, punctuation) → removed
- Accented characters → removed (can be enhanced with transliteration if needed)

**Alternatives Considered**:
- **UUID-based slugs**: Rejected - Not human-readable, defeats SEO purpose
- **Incremental suffixes** (e.g., `project-1`, `project-2`): Rejected - Not predictable, breaks shareability if projects are reordered
- **Hash-based slugs**: Rejected - Not readable, harder to debug

**Collision Prevention**:
- Validate uniqueness at build time via `validateSlugUniqueness()`
- If collision occurs, throw error during development (fail-fast)
- For production resilience, could add manual slug override field to Project type (future enhancement)

---

### 4. Status Badge Design Pattern (Nord Theme)

**Question**: How should the three project statuses be visually represented using only Nord colors?

**Decision**: Color-coded badges with Nord palette + icons for enhanced clarity

**Rationale**:
- Nord theme provides sufficient color variety for three distinct states
- Color + icon combination enhances accessibility (not relying solely on color)
- Tailwind CSS utility classes enable responsive, theme-aware styling
- MUI icons available for consistent iconography

**Status Color Mapping**:

| Status | Nord Color | MUI Theme Token | Icon | Semantic Meaning |
|--------|-----------|-----------------|------|------------------|
| **Completed** | Nord 14 (Green) | `theme.palette.success.main` | CheckCircle | Success, finished |
| **In Progress** | Nord 13 (Yellow) | `theme.palette.warning.main` | PlayCircle | Active, ongoing |
| **To-Do** | Nord 9 (Blue) | `theme.palette.info.main` | Circle | Planned, pending |

**Dark Mode Adjustments**:
- Background colors use MUI theme tokens mapped to Nord palette (via `muiTheme.ts`)
- Text color uses `theme.palette.getContrastText()` for automatic contrast
- MUI's theme system handles dark mode transitions automatically

**Component Structure**:
```typescript
import { Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'small' | 'medium';
}

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const theme = useTheme();
  
  const config = {
    completed: { color: 'success', icon: CheckCircle, label: 'Completed' },
    'in-progress': { color: 'warning', icon: PlayCircle, label: 'In Progress' },
    'to-do': { color: 'info', icon: Circle, label: 'To-Do' },
  }[status];
  
  return (
    <Chip
      icon={<config.icon />}
      label={config.label}
      color={config.color as 'success' | 'warning' | 'info'}
      size={size}
      sx={{ fontWeight: 500 }}
    />
  );
}
```

**Alternatives Considered**:
- **Text-only badges**: Rejected - Less visually distinct, harder to scan quickly
- **Outline badges (variant="outlined")**: Rejected - Less prominent, doesn't leverage Nord's vibrant colors
- **Custom colors outside Nord**: Rejected - Violates constitution principle I
- **Tailwind CSS classes**: Rejected - MUI Chip component provides better accessibility and theme integration

**Accessibility**:
- Contrast ratios automatically handled by MUI theme system (Nord colors mapped to theme tokens)
- Icon + text combination supports users with color blindness
- MUI Chip provides semantic HTML and ARIA attributes automatically

---

### 5. Project Detail Page Layout Design

**Question**: What information should be displayed on the project detail page and in what structure?

**Decision**: Hero section + metadata grid + full description + technology stack + action CTAs

**Rationale**:
- Progressive disclosure: most important info (title, status) above the fold
- Scannable layout with clear visual hierarchy
- Responsive grid adapts to mobile/tablet/desktop
- Aligns with existing portfolio design language (Nord theme, Tailwind utilities)

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ [Header - Existing Site Navigation]     │
├─────────────────────────────────────────┤
│                                          │
│  Hero Section:                           │
│  ┌────────────────────────────────┐     │
│  │ Project Title (H1)             │     │
│  │ Status Badge                   │     │
│  │ Short description preview      │     │
│  └────────────────────────────────┘     │
│                                          │
│  Metadata Grid:                          │
│  ┌──────┬──────┬──────┬──────┐         │
│  │ Tech │ Date │ Links│ Etc. │         │
│  └──────┴──────┴──────┴──────┘         │
│                                          │
│  Full Description:                       │
│  ┌────────────────────────────────┐     │
│  │ Detailed project overview      │     │
│  │ (Markdown or rich text)        │     │
│  └────────────────────────────────┘     │
│                                          │
│  Technology Stack:                       │
│  ┌────────────────────────────────┐     │
│  │ [Badge] [Badge] [Badge]        │     │
│  └────────────────────────────────┘     │
│                                          │
│  Action CTAs:                            │
│  ┌─────────┐  ┌─────────┐              │
│  │ View    │  │ View    │              │
│  │ Demo    │  │ Code    │              │
│  └─────────┘  └─────────┘              │
│                                          │
│  [Optional: Gallery/Screenshots]        │
│                                          │
└─────────────────────────────────────────┘
```

**Content Sections**:

1. **Hero Section** (always visible):
   - Project title (H1 for SEO)
   - Status badge (prominent)
   - Brief description (1-2 sentences)

2. **Metadata Grid** (2-4 columns responsive):
   - Status (duplicate badge for emphasis)
   - Technology count
   - Optional: Date created/updated
   - Optional: Category/context

3. **Full Description**:
   - Current description from `projects.ts`
   - Future: Support for Markdown or rich text formatting
   - Minimum 2-3 paragraphs

4. **Technology Stack**:
   - Reuse existing `TechBadge` component
   - Clickable badges link to filtered gallery (future enhancement)

5. **Call-to-Action Buttons**:
   - "View Live Demo" (if `liveUrl` exists)
   - "View Source Code" (if `repoUrl` exists)
   - Styled as MUI buttons or Tailwind styled links

6. **Gallery** (optional, future):
   - Project screenshots in carousel or grid
   - Only if `images` array exists on project

**Responsive Behavior**:
- **Mobile** (< 640px): Single column, stacked sections
- **Tablet** (640-1024px): 2-column metadata grid
- **Desktop** (> 1024px): Full metadata grid, wider content area

**Alternatives Considered**:
- **Sidebar layout**: Rejected - Doesn't work well on mobile
- **Tabbed interface**: Rejected - Adds unnecessary complexity for static content
- **Masonry grid**: Rejected - Overkill for linear content

**Creative Enhancements** (within scope):
- Add "Related Projects" section based on shared technologies
- Include "Back to Projects" breadcrumb for navigation
- Add social share buttons (LinkedIn, Twitter)
- Display project "last updated" timestamp
- Include embedded demo iframe (if applicable)

---

## Summary of Decisions

All NEEDS CLARIFICATION items have been resolved:

| Item | Decision | Impact |
|------|----------|--------|
| Testing Strategy | Manual testing + TypeScript strict mode | No new dependencies, faster development |
| Dynamic Routing | Next.js App Router with SSG | SEO-optimized, fast page loads |
| Slug Generation | Lowercase + hyphenation algorithm | Predictable, collision-safe URLs |
| Status Badge Design | Nord colors + icons | Accessible, theme-consistent |
| Detail Page Layout | Hero + metadata + description + CTAs | Clear hierarchy, responsive |

## Next Steps

Proceed to **Phase 1: Design & Contracts** to generate:
1. `data-model.md` - Entity schema and status type definitions
2. `contracts/types.ts` - TypeScript interfaces for new types
3. `quickstart.md` - Implementation guidance for developers
