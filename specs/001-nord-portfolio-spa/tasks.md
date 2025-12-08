# Tasks: Nord Portfolio SPA

**Feature**: 001-nord-portfolio-spa  
**Date**: 2025-12-08  
**Input**: Design documents from `/specs/001-nord-portfolio-spa/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/types.ts

**Tests**: Tests are NOT requested in this specification - focus is on implementation and manual QA via Lighthouse metrics.

**Organization**: Tasks are organized following the user's specified precedence order to avoid blocking dependencies, then grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup [Infra] - Initial Project Configuration

**Purpose**: Install core dependencies and configure TypeScript to enable all subsequent work

- [X] T001 Install core dependencies (embla-carousel-react, next-themes, lucide-react, clsx, tailwind-merge) via pnpm
- [X] T002 Verify TypeScript strict mode is enabled in tsconfig.json
- [X] T003 Configure absolute imports with @/* path alias in tsconfig.json

---

## Phase 2: Foundational [Design] - Theme Configuration

**Purpose**: Establish Nord design system foundation that all components will use

**⚠️ CRITICAL**: No component work can begin until Nord theme is configured

- [X] T004 Create Nord CSS variables (nord0-nord15) in src/app/globals.css
- [X] T005 Define semantic color tokens (light theme) in src/app/globals.css
- [X] T006 Define semantic color tokens (dark theme) in src/app/globals.css
- [X] T007 Add global focus-visible styles and smooth transitions in src/app/globals.css
- [X] T008 Configure Tailwind darkMode: 'class' in tailwind.config.ts
- [X] T009 Extend Tailwind theme with semantic color tokens (app.bg, text.primary, accent.primary) in tailwind.config.ts

**Checkpoint**: Nord theme system complete - component development can now begin

---

## Phase 3: User Story 1 - View Portfolio Content (Priority: P1) 🎯 MVP

**Goal**: Visitor can view complete portfolio with hero section and all projects displayed in an adaptive layout (grid on desktop, carousel on mobile).

**Independent Test**: Load the page on desktop and mobile, scroll through all content. Verify hero section displays with proper typography, projects show in grid on desktop (≥768px) and carousel on mobile (<768px), all content is readable with Nord colors.

### Implementation for User Story 1

#### [Layout] Shell da Aplicação

- [X] T010 [US1] Update src/app/layout.tsx with RootLayout structure and ThemeProvider import
- [X] T011 [US1] Create ThemeProvider wrapper component ('use client') in src/app/providers.tsx using next-themes
- [X] T012 [US1] Import globals.css and configure metadata in src/app/layout.tsx

#### [Component] TypeScript Contracts

- [X] T013 [P] [US1] Create shared TypeScript types (Project, Technology, ThemeType) in src/lib/types.ts based on contracts/types.ts

#### [Content] Project Data

- [X] T014 [P] [US1] Create mock project data array (6-8 projects) in src/data/projects.ts with all required fields (id, title, description, technologies, order)

#### [Component] Hero Section

- [X] T015 [P] [US1] Create Hero component (Server Component) in src/components/hero/Hero.tsx with Nord typography

#### [Component] Project Card

- [X] T016 [P] [US1] Create ProjectCard component (Server Component) in src/components/projects/ProjectCard.tsx displaying title, description, and technology badges
- [X] T017 [P] [US1] Create TechBadge component (Server Component) in src/components/ui/TechBadge.tsx with Nord accent colors

#### [Feature] Adaptive Gallery Container

- [X] T018 [US1] Create ProjectGallery component (Server Component) in src/components/projects/ProjectGallery.tsx with conditional rendering logic for desktop/mobile
- [X] T019 [US1] Implement CSS Grid layout for desktop (≥768px) in ProjectGallery.tsx
- [X] T020 [US1] Create MobileCarousel component ('use client') in src/components/projects/MobileCarousel.tsx using Embla Carousel
- [X] T021 [US1] Configure Embla options (align: 'start', dragFree: false, loop: false) in MobileCarousel.tsx
- [X] T022 [US1] Add carousel position indicators with ARIA labels in MobileCarousel.tsx

#### [Layout] Main Page Assembly

- [X] T023 [US1] Create ProjectsSection wrapper component (Server Component) in src/components/projects/ProjectsSection.tsx
- [X] T024 [US1] Update src/app/page.tsx to render Hero and ProjectsSection with project data

**Checkpoint**: User Story 1 complete - Portfolio is viewable with adaptive layout and Nord theme

---

## Phase 4: User Story 2 - Filter Projects by Technology (Priority: P2)

**Goal**: Visitor can filter projects by clicking technology buttons, see URL update with filter parameter, and share/bookmark filtered views.

**Independent Test**: Click any technology filter button and verify: (1) only matching projects display, (2) URL changes to include ?tech=<slug>, (3) copying and opening the filtered URL loads the same filtered view, (4) browser back button restores previous filter state.

### Implementation for User Story 2

#### [Feature] URL State Management

- [X] T025 [P] [US2] Create useProjectFilter hook in src/lib/hooks/useProjectFilter.ts using useSearchParams and useRouter
- [X] T026 [P] [US2] Create technology extraction utility getTechnologies() in src/lib/technologies.ts
- [X] T027 [P] [US2] Create project filtering utility filterProjects() in src/lib/projects.ts

#### [Component] Filter Controls

- [X] T028 [US2] Create FilterControls component ('use client') in src/components/projects/FilterControls.tsx with technology buttons
- [X] T029 [US2] Implement onClick handlers in FilterControls.tsx that update URL via useRouter.replace()
- [X] T030 [US2] Display project count for each technology in FilterControls.tsx
- [X] T031 [US2] Add active/inactive visual states with Nord accent colors in FilterControls.tsx
- [X] T032 [US2] Add ARIA attributes (role, aria-pressed) to filter buttons in FilterControls.tsx

#### [Component] Empty State

- [X] T033 [P] [US2] Create EmptyState component (Server Component) in src/components/ui/EmptyState.tsx for "no projects found" message

#### [Layout] Integration with Gallery

- [X] T034 [US2] Update ProjectsSection.tsx to read searchParams prop and pass filtered projects
- [X] T035 [US2] Update src/app/page.tsx to accept searchParams prop and pass to ProjectsSection
- [X] T036 [US2] Update ProjectGallery.tsx to handle empty filtered results by rendering EmptyState

**Checkpoint**: User Story 2 complete - Filtering works with URL-first state

---

## Phase 5: User Story 3 - Switch Between Light and Dark Themes (Priority: P3)

**Goal**: Visitor can toggle between light and dark Nord themes, preference persists across sessions, and no flash of wrong theme occurs on page load.

**Independent Test**: Click theme toggle and verify smooth color transition. Reload page and verify theme persists. Clear browser storage, reload, and verify default matches system preference. Check for any theme "flicker" on initial load.

### Implementation for User Story 3

#### [Component] Theme Toggle

- [X] T037 [US3] Create ThemeToggle component ('use client') in src/components/theme/ThemeToggle.tsx using useTheme hook
- [X] T038 [US3] Add sun/moon icons from lucide-react in ThemeToggle.tsx
- [X] T039 [US3] Implement onClick handler to toggle between light/dark in ThemeToggle.tsx
- [X] T040 [US3] Add ARIA label indicating current theme and toggle action in ThemeToggle.tsx
- [X] T041 [US3] Style ThemeToggle.tsx with Nord colors and visible focus state

#### [Layout] Theme Toggle Placement

- [X] T042 [US3] Update src/app/layout.tsx to include ThemeToggle in header/navigation area
- [X] T043 [US3] Add suppressHydrationWarning to <html> tag in layout.tsx to prevent hydration warnings

**Checkpoint**: User Story 3 complete - Theme switching works flicker-free with persistence

---

## Phase 6: User Story 4 - Navigate Projects via Touch Gestures (Priority: P2)

**Goal**: Mobile visitors can swipe left/right through projects with smooth animations, snap-to-card behavior, and clear position indicators.

**Independent Test**: On mobile device or emulator (<768px), swipe left/right on the carousel. Verify smooth scrolling, cards snap to position on release, indicators update to show current position, and carousel provides feedback at endpoints.

### Implementation for User Story 4

#### [Feature] Enhanced Carousel UX

- [X] T044 [US4] Add snap scroll behavior and smooth momentum scrolling in MobileCarousel.tsx
- [X] T045 [US4] Implement endpoint bounce effect when swiping beyond first/last project in MobileCarousel.tsx
- [X] T046 [US4] Add touch event handlers to distinguish tap vs swipe gestures in MobileCarousel.tsx
- [X] T047 [US4] Update position indicators to reflect current slide on scroll in MobileCarousel.tsx
- [X] T048 [US4] Add ARIA live region announcing position changes in MobileCarousel.tsx

**Checkpoint**: User Story 4 complete - Touch navigation is smooth and responsive

---

## Phase 7: Polish & Cross-Cutting Concerns [QA]

**Purpose**: Final validation, accessibility verification, and performance optimization

- [ ] T049 [P] Run Lighthouse audit and verify Performance score ≥90
- [ ] T050 [P] Run Lighthouse audit and verify Accessibility score ≥95
- [ ] T051 [P] Verify all color combinations meet WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI)
- [ ] T052 [P] Test keyboard navigation through all interactive elements (filters, theme toggle, carousel)
- [ ] T053 [P] Verify Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [X] T054 Run production build (pnpm build) and verify no errors
- [X] T055 Test all scenarios from quickstart.md on both desktop and mobile viewports
- [X] T056 [P] Verify no arbitrary hex codes exist in codebase (only Nord variables)
- [X] T057 [P] Verify 'use client' directive only appears in leaf components (providers.tsx, ThemeToggle.tsx, FilterControls.tsx, MobileCarousel.tsx)

**Note**: T049-T053 require manual testing with Lighthouse and browser dev tools. Dev server is running at http://localhost:3000

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) - BLOCKS all component work
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - First deliverable (MVP)
- **User Story 2 (Phase 4)**: Depends on User Story 1 (Phase 3) - Adds filtering to existing gallery
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) - Can run parallel to US1/US2 if desired
- **User Story 4 (Phase 6)**: Depends on User Story 1 (Phase 3) - Enhances existing carousel
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation for all features - implements core viewing experience
- **User Story 2 (P2)**: Builds on US1's gallery - adds filtering to existing structure
- **User Story 3 (P3)**: Independent of US1/US2 - only needs theme foundation (Phase 2)
- **User Story 4 (P2)**: Enhances US1's carousel - improves existing mobile UX

### Within Each User Story

**US1 Structure**:
1. Layout shell (T010-T012)
2. Parallel: Types (T013), Data (T014), Hero (T015), Cards (T016-T017)
3. Gallery container (T018-T022)
4. Page assembly (T023-T024)

**US2 Structure**:
1. Parallel: Hook (T025), Utilities (T026-T027), Empty state (T033)
2. Filter controls (T028-T032)
3. Integration (T034-T036)

**US3 Structure**:
1. Theme toggle component (T037-T041)
2. Layout placement (T042-T043)

**US4 Structure**:
1. Carousel enhancements (T044-T048) - sequential refinements

### Parallel Opportunities

**Setup Phase (Phase 1)**: Tasks T001-T003 are sequential (dependency installation first)

**Foundational Phase (Phase 2)**: Tasks T004-T007 (CSS variables) can run together, then T008-T009 (Tailwind config)

**User Story 1 Parallelization**:
```
After T010-T012 (layout):
- T013 (types)
- T014 (data)  
- T015 (hero)
- T016-T017 (cards)
All can run in parallel - different files
```

**User Story 2 Parallelization**:
```
Initial batch:
- T025 (hook)
- T026 (tech utility)
- T027 (filter utility)
- T033 (empty state)
All can run in parallel - different files
```

**Polish Phase (Phase 7)**: Tasks T049-T053, T056-T057 can run in parallel (different validations)

---

## Parallel Example: User Story 1 - Core Components

After layout is ready (T010-T012), these tasks can launch simultaneously:

```bash
# Parallel batch - different files, no dependencies:
Task T013: "Create shared types in src/lib/types.ts"
Task T014: "Create mock projects in src/data/projects.ts"
Task T015: "Create Hero in src/components/hero/Hero.tsx"
Task T016: "Create ProjectCard in src/components/projects/ProjectCard.tsx"
Task T017: "Create TechBadge in src/components/ui/TechBadge.tsx"
```

---

## Implementation Strategy

### MVP First (Recommended Path)

1. **Complete Phase 1**: Setup dependencies and TypeScript → ~15 min
2. **Complete Phase 2**: Nord theme configuration → ~30 min
3. **Complete Phase 3**: User Story 1 (View Portfolio) → ~2-3 hours
   - **STOP and VALIDATE**: Load page, verify content displays correctly on desktop and mobile
   - **Deploy MVP**: Working portfolio is now viewable
4. **Add Phase 4**: User Story 2 (Filtering) → ~1-2 hours
   - **VALIDATE**: Test filtering, URL updates, bookmarking
5. **Add Phase 5**: User Story 3 (Theme Toggle) → ~45 min
   - **VALIDATE**: Test theme switching, persistence, no flicker
6. **Add Phase 6**: User Story 4 (Touch Gestures) → ~1 hour
   - **VALIDATE**: Test mobile swipe, snap behavior
7. **Complete Phase 7**: Polish & QA → ~1 hour

**Total Estimated Time**: 6-9 hours for full feature

### Incremental Delivery Value

- **After Phase 3 (US1)**: Deployable MVP - visitors can view portfolio
- **After Phase 4 (US2)**: Enhanced UX - visitors can filter by technology
- **After Phase 5 (US3)**: Improved accessibility - theme preference support
- **After Phase 6 (US4)**: Polished mobile UX - smooth touch navigation
- **After Phase 7**: Production-ready - performance validated

### Parallel Team Strategy

With 2-3 developers after Phase 2 completes:

- **Developer A**: User Story 1 (T010-T024) - Core viewing experience
- **Developer B**: User Story 3 (T037-T043) - Theme system (parallel to US1)
- **Developer C**: Assists with US1 parallel tasks (T013-T017)

Once US1 completes:
- **Developer A**: User Story 2 (T025-T036) - Filtering
- **Developer B**: User Story 4 (T044-T048) - Touch enhancements
- **Developer C**: Polish (T049-T057) - QA validation

---

## Notes

- **[P] marker**: Tasks can run in parallel (different files, no interdependencies)
- **[Story] label**: Tracks which user story the task belongs to for traceability
- **File paths**: All paths shown are exact locations per plan.md structure
- **Server vs Client**: Most components are Server Components; only 4 files use 'use client' (providers.tsx, ThemeToggle.tsx, FilterControls.tsx, MobileCarousel.tsx)
- **Constitution compliance**: All colors use Nord variables, URL-first state for filters, Server Components by default
- **No tests included**: Specification focuses on Lighthouse metrics and manual QA rather than automated tests
- **Commit strategy**: Commit after each completed user story phase for safe rollback points
- **User precedence followed**: Tasks ordered per user's request (Infra → Design → Layout → Component → Feature → Content → QA)

---

## Summary

- **Total Tasks**: 57
- **Task Count per User Story**:
  - Setup (Phase 1): 3 tasks
  - Foundational (Phase 2): 6 tasks  
  - User Story 1 - View Portfolio (P1): 15 tasks
  - User Story 2 - Filter Projects (P2): 12 tasks
  - User Story 3 - Theme Toggle (P3): 7 tasks
  - User Story 4 - Touch Gestures (P2): 5 tasks
  - Polish & QA (Phase 7): 9 tasks
- **Parallel Opportunities**: 18+ tasks can run in parallel at various stages
- **MVP Scope**: Phases 1-3 (Tasks T001-T024) deliver a functional, viewable portfolio
- **Format Validation**: ✅ All tasks follow checkbox format with Task ID, [P] marker where applicable, [Story] label for user stories, and exact file paths
