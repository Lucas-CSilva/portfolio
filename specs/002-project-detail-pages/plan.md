# Implementation Plan: Project Detail Pages with Enhanced Status Display

**Branch**: `002-project-detail-pages` | **Date**: December 13, 2025 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-project-detail-pages/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature enhances the portfolio projects page by adding status indicators (in progress/to-do/completed) to project cards in both gallery and carousel views, implementing clickable navigation to dedicated project detail pages with SEO-friendly URLs (GitHub-style `/projects/[slug]`), and creating comprehensive project detail pages while maintaining the Nord theme and site header consistency. The implementation leverages Next.js App Router for dynamic routing, maintains server-first architecture for layouts, and uses MUI components with the `sx` prop for all styling (MUI-first approach), avoiding Tailwind classes where MUI can achieve the same result.

**Architecture Note**: This feature follows a **MUI-first styling approach** - all interactive components use MUI components (Card, Chip, Button, Box, etc.) with the `sx` prop for styling. Tailwind classes are avoided in favor of MUI's theme-aware styling system, which provides better integration with the Nord theme through `src/lib/theme/muiTheme.ts` and automatic dark mode handling.

## Technical Context

**Language/Version**: TypeScript with Next.js 16.0.7  
**Primary Dependencies**: Next.js + Tailwind CSS + Material UI (official stack), React 19.2.0, next-themes 0.4.6, framer-motion 12.23.25  
**Storage**: Static project data in TypeScript files (`src/data/projects.ts`), no database required  
**Testing**: Next.js built-in testing (configuration pending - NEEDS CLARIFICATION: test strategy for new components)  
**Target Platform**: Web (modern browsers with JavaScript enabled)  
**Project Type**: Web application (Next.js App Router structure)  
**Performance Goals**: LCP < 2.5s, FCP < 1.8s, smooth 60fps animations, < 3s page load for project detail pages  
**Constraints**: 
  - Must preserve existing Nord theme (16-color palette only)
  - Must maintain responsive layout (mobile/tablet/desktop)
  - Must not break existing project filtering/search functionality
  - Must support both light and dark themes without flicker
  - Browser back/forward navigation must work correctly
  
**Scale/Scope**: 
  - 8 existing projects (expandable)
  - 2 project display components to enhance (gallery + carousel)
  - 1 new dynamic route page to create
  - 3 new components (StatusBadge, ProjectDetailPage, NotFound)
  - Expected load: < 100 concurrent users (personal portfolio)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Integridade do Design System Nord ✅

**Status**: PASS (Enhanced with MUI theme integration)  
**Assessment**: Feature design will exclusively use Nord color palette (nord0-nord15) through:
- MUI theme tokens from `src/lib/theme/muiTheme.ts` (primary choice for all styling)
- Theme palette colors mapped to Nord: success=nord-14, warning=nord-13, info=nord-9
- No arbitrary hex codes will be introduced
- No Tailwind utility classes for colors (MUI `sx` prop only)

**Action Items**:
- StatusBadge component MUST use MUI Chip with color prop ('success', 'warning', 'info')
- Project detail page styling MUST use MUI components with `sx` prop and theme tokens
- All colors MUST reference theme.palette values (e.g., `theme.palette.success.main`)
- Verify status badge colors provide adequate contrast (WCAG AA) in both light/dark themes (MUI handles automatically)

### II. Arquitetura Next.js & Material UI Integration ✅

**Status**: PASS (Enhanced with MUI-first approach)  
**Assessment**: Feature respects server-first architecture and embraces MUI-first styling:
- Project detail page (`app/projects/[slug]/page.tsx`) will be a Server Component for data fetching
- Interactive UI components use `'use client'` directive with MUI components (Card, Chip, Button, etc.)
- All styling uses MUI `sx` prop instead of Tailwind classes for better theme integration
- Layout and header components remain Server Components

**Action Items**:
- Project detail page MUST fetch project data server-side (no client-side data fetching)
- Only leaf components with interactivity (click handlers, MUI components) should use `'use client'`
- ALL styling MUST use MUI components with `sx` prop (avoid Tailwind classes)
- Use theme tokens from `muiTheme.ts` for colors (e.g., `theme.palette.success.main` for completed status)
- Verify no unnecessary client boundary leakage in component tree

**MUI-First Rationale**:
- MUI components provide built-in accessibility (ARIA attributes, keyboard navigation)
- MUI theme system automatically handles dark mode through `muiTheme.ts`
- Better integration with Nord palette via theme tokens (success/warning/info mapped to Nord 14/13/9)
- Consistent component behavior across the application

### III. Estado na URL (URL-First State) ✅

**Status**: PASS  
**Assessment**: Feature inherently follows URL-first state:
- Project detail pages use dynamic route segments (`/projects/[slug]`)
- Deep-linking is native to the design
- No ephemeral state for navigation (URL is source of truth)
- Existing filter state (search params) is not affected by this feature

**Action Items**:
- Implement slug generation logic that ensures uniqueness
- URL slug MUST be derived from project name deterministically
- Browser back/forward navigation MUST work correctly (Next.js handles this natively)
- No `useState` for navigation state (rely on Next.js router)

### Governance Compliance

#### Official Technology Stack ✅
**Status**: PASS (Enhanced with MUI-first approach)  
**Assessment**: Feature uses approved stack (Next.js + Tailwind CSS + Material UI) with MUI-first styling preference
- No new dependencies required beyond existing stack
- StatusBadge uses MUI Chip component (built-in, no custom implementation needed)
- All UI components use MUI components: Card, Button, Box, Container, Grid, Typography, etc.
- Styling via MUI `sx` prop only (no Tailwind classes)
- Tailwind CSS remains available but is deprioritized in favor of MUI for consistency

**MUI-First Justification**:
- Better integration with existing `muiTheme.ts` Nord color mapping
- Built-in accessibility features (ARIA, keyboard navigation, focus management)
- Automatic dark mode support through theme system
- Consistent component API across the application
- Reduces cognitive load (one styling system instead of mixing two)

#### Acessibilidade ✅
**Status**: PASS  
**Assessment**: Accessibility requirements identified:
- Status indicators MUST have adequate contrast in both themes
- Clickable cards MUST have visible focus states
- Project detail pages MUST have proper heading hierarchy
- Links MUST have descriptive aria-labels where needed

**Action Items**:
- Test status badge contrast ratios (WCAG AA minimum 4.5:1 for text)
- Ensure keyboard navigation works for all interactive elements
- Add skip links if project detail page becomes long
- Test with screen reader to verify semantic HTML

#### Código Limpo ✅
**Status**: PASS  
**Assessment**: Feature will maintain TypeScript strict mode and project linting standards
- All new components will be strongly typed
- Interfaces will extend existing types where applicable
- ESLint rules will be followed

### Gate Evaluation

**Overall Status**: ✅ PASS - All constitution principles are satisfied with enhanced MUI-first approach.

**MUI-First Approach Benefits**:
- ✅ Maintains Nord theme integrity through `muiTheme.ts` token mapping
- ✅ Respects Next.js App Router architecture (Server Components by default)
- ✅ Improves accessibility with built-in MUI features
- ✅ Simplifies styling approach (single system instead of Tailwind + MUI mix)
- ✅ Reduces bundle size by avoiding duplicate styling utilities

**Proceed to Phase 0**: Research has been completed with MUI-first patterns established.

## Project Structure

### Documentation (this feature)

```text
specs/002-project-detail-pages/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── types.ts         # TypeScript type definitions
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── projects/
│   │   └── [slug]/
│   │       ├── page.tsx          # NEW: Project detail page (Server Component)
│   │       └── not-found.tsx     # NEW: 404 handler for invalid project slugs
│   └── not-found.tsx              # Existing: Site-wide 404
├── components/
│   ├── projects/
│   │   ├── ProjectCard.tsx        # MODIFIED: Add status badge + click handler
│   │   ├── ProjectGallery.tsx     # MODIFIED: Make cards clickable
│   │   └── StatusBadge.tsx        # NEW: Status indicator component
│   └── sections/
│       ├── FeaturedProjectsCarousel.tsx  # MODIFIED: Add status badge + click handler
│       └── ProjectDetailView.tsx  # NEW: Comprehensive project detail layout
├── data/
│   └── projects.ts                # MODIFIED: Add status field to project data
├── lib/
│   ├── types.ts                   # MODIFIED: Add ProjectStatus type
│   ├── projects.ts                # MODIFIED: Add slug generation utilities
│   └── utils.ts                   # Existing: Utility functions
```

**Structure Decision**: This is a web application using Next.js App Router. The feature follows the established Next.js conventions with:
- Dynamic routes in `app/projects/[slug]/` for SEO-friendly URLs
- Server Components for pages and layouts (data fetching)
- Client Components for interactive UI elements (StatusBadge, clickable cards)
- Shared components in `src/components/` organized by domain (projects, sections)
- Static data in `src/data/` (no database needed)
- Type definitions and utilities in `src/lib/`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**Status**: No violations - this section is not applicable.

All constitution principles are satisfied without requiring exceptions or justifications.
