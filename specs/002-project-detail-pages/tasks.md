# Tasks: Project Detail Pages with Enhanced Status Display

**Input**: Design documents from `/specs/002-project-detail-pages/`
**Feature Branch**: `002-project-detail-pages`
**Prerequisites**: ✅ plan.md, ✅ spec.md, ✅ research.md, ✅ data-model.md, ✅ contracts/types.ts

**Tests**: NOT REQUESTED - No test tasks included (manual testing per quickstart.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Implementation Strategy

**MVP Approach**: Implement User Story 1 first to deliver immediate value (status display on cards). Stories 2-4 build upon this foundation to add navigation and detail pages.

**MUI-First**: All components use Material UI with `sx` prop for styling. No Tailwind classes.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and type definitions

- [X] T001 Update Project type definition to include status field in src/lib/types.ts
- [X] T002 [P] Add ProjectStatus type export in src/lib/types.ts
- [X] T003 [P] Create slug utility functions in src/lib/projects.ts (generateSlug, validateSlugUniqueness, findProjectBySlug)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Add status field to all 8 projects in src/data/projects.ts (assign completed/in-progress/to-do based on liveUrl presence)
- [X] T005 Run slug uniqueness validation in development mode (add check to app startup)
- [X] T006 Verify TypeScript compilation passes with new types
- [X] T007 Verify no existing components broke with Project type changes

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Project Status at a Glance (Priority: P1) 🎯 MVP

**Goal**: Display status badges (completed/in-progress/to-do) on all project cards in gallery and carousel views

**Independent Test**: View projects page and verify each card shows a color-coded status badge with icon and label

### Implementation for User Story 1

- [X] T008 [P] [US1] Create StatusBadge component using MUI Chip in src/components/projects/StatusBadge.tsx
- [X] T009 [P] [US1] Configure status colors in StatusBadge (success=completed, warning=in-progress, info=to-do)
- [X] T010 [US1] Import and add StatusBadge to ProjectCard component in src/components/projects/ProjectCard.tsx
- [X] T011 [US1] Import and add StatusBadge to FeaturedProjectsCarousel items in src/components/sections/FeaturedProjectsCarousel.tsx
- [ ] T012 [US1] Test status badge display in light theme (verify contrast and visibility)
- [ ] T013 [US1] Test status badge display in dark theme (verify MUI theme handles colors correctly)
- [ ] T014 [US1] Verify status badges appear in filtered/searched results in ProjectGallery

**Checkpoint**: Status badges visible on all project cards. MVP deliverable complete.

---

## Phase 4: User Story 2 - Navigate to Project Detail Page (Priority: P2)

**Goal**: Make project cards clickable and navigate to dedicated detail pages with preserved header

**Independent Test**: Click any project card and verify navigation to `/projects/[slug]` with site header visible

**Dependencies**: Requires US1 (status display) to be complete for visual consistency

### Implementation for User Story 2

- [X] T015 [P] [US2] Create dynamic route directory src/app/projects/[slug]/
- [X] T016 [P] [US2] Create page.tsx with generateStaticParams for all projects in src/app/projects/[slug]/page.tsx
- [X] T017 [P] [US2] Create not-found.tsx for 404 handling in src/app/projects/[slug]/not-found.tsx
- [X] T018 [US2] Convert ProjectCard to clickable with router.push in src/components/projects/ProjectCard.tsx
- [X] T019 [US2] Add MUI Card hover effect with sx prop in src/components/projects/ProjectCard.tsx
- [X] T020 [US2] Add keyboard navigation support (Enter/Space) to ProjectCard in src/components/projects/ProjectCard.tsx
- [X] T021 [US2] Update FeaturedProjectsCarousel items to be clickable in src/components/sections/FeaturedProjectsCarousel.tsx
- [ ] T022 [US2] Test click navigation from gallery cards to detail pages
- [ ] T023 [US2] Test click navigation from carousel cards to detail pages
- [ ] T024 [US2] Verify site header remains visible on detail pages
- [ ] T025 [US2] Test browser back button returns to projects page

**Checkpoint**: All project cards clickable and navigate correctly. Site header preserved.

---

## Phase 5: User Story 3 - Use SEO-Friendly Project URLs (Priority: P2)

**Goal**: Generate and use human-readable URLs like `/projects/ecommerce-platform` from project titles

**Independent Test**: Navigate to a project and verify URL is lowercase-hyphenated project name. Test direct URL access.

**Dependencies**: Requires US2 (navigation) to be complete. Can be implemented in parallel with US2.

### Implementation for User Story 3

- [ ] T026 [US3] Implement generateSlug function in src/lib/projects.ts (lowercase, hyphenate, sanitize)
- [ ] T027 [US3] Implement validateSlugUniqueness function in src/lib/projects.ts
- [ ] T028 [US3] Implement findProjectBySlug function in src/lib/projects.ts
- [ ] T029 [US3] Use generateSlug in ProjectCard onClick handler in src/components/projects/ProjectCard.tsx
- [ ] T030 [US3] Use generateSlug in FeaturedProjectsCarousel onClick in src/components/sections/FeaturedProjectsCarousel.tsx
- [ ] T031 [US3] Use findProjectBySlug in page.tsx to match params.slug in src/app/projects/[slug]/page.tsx
- [ ] T032 [US3] Add generateMetadata for SEO in src/app/projects/[slug]/page.tsx
- [ ] T033 [US3] Test URL generation for all 8 projects (verify uniqueness)
- [ ] T034 [US3] Test direct navigation to `/projects/task-management-app` (deep-linking)
- [ ] T035 [US3] Test invalid slug shows 404 page (e.g., `/projects/nonexistent`)
- [ ] T036 [US3] Test projects with special characters in title generate valid slugs

**Checkpoint**: All project URLs are SEO-friendly and shareable. Deep-linking works.

---

## Phase 6: User Story 4 - Experience Enhanced Project Details (Priority: P3)

**Goal**: Display comprehensive project information on detail pages with organized layout, CTAs, and optional gallery

**Independent Test**: View any project detail page and verify all sections display: hero, metadata, tech stack, CTAs, gallery (if images exist)

**Dependencies**: Requires US2 (navigation) and US3 (URLs) to be complete

### Implementation for User Story 4

- [ ] T037 [P] [US4] Create ProjectDetailView component in src/components/sections/ProjectDetailView.tsx
- [ ] T038 [P] [US4] Implement hero section with MUI Typography and StatusBadge in ProjectDetailView
- [ ] T039 [P] [US4] Implement metadata grid with MUI Grid in ProjectDetailView
- [ ] T040 [P] [US4] Implement technology stack section with TechBadge components in ProjectDetailView
- [ ] T041 [P] [US4] Implement CTA buttons (View Demo, View Code) with MUI Button in ProjectDetailView
- [ ] T042 [P] [US4] Implement back button with router.back() in ProjectDetailView
- [ ] T043 [P] [US4] Implement image gallery with MUI Grid (conditional render) in ProjectDetailView
- [ ] T044 [US4] Add ProjectDetailView to page.tsx in src/app/projects/[slug]/page.tsx
- [ ] T045 [US4] Test detail page displays title, status, description correctly
- [ ] T046 [US4] Test metadata grid shows status and technology count
- [ ] T047 [US4] Test technology stack section displays all TechBadges
- [ ] T048 [US4] Test CTA buttons appear only when URLs exist (liveUrl/repoUrl)
- [ ] T049 [US4] Test CTA buttons open in new tab with correct URLs
- [ ] T050 [US4] Test back button returns to projects page
- [ ] T051 [US4] Test image gallery displays when project.images exists
- [ ] T052 [US4] Test projects without images don't break layout
- [ ] T053 [US4] Test responsive layout on mobile (< 640px)
- [ ] T054 [US4] Test responsive layout on tablet (640-1024px)
- [ ] T055 [US4] Test responsive layout on desktop (> 1024px)

**Checkpoint**: All project detail pages display comprehensive information with proper responsive layout.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T056 [P] Add loading states for page transitions (optional, Next.js handles by default)
- [ ] T057 [P] Verify all MUI components use theme tokens from muiTheme.ts
- [ ] T058 [P] Verify no Tailwind classes used (MUI sx prop only)
- [ ] T059 Accessibility audit: keyboard navigation works for all interactive elements
- [ ] T060 Accessibility audit: status badge colors meet WCAG AA contrast (both themes)
- [ ] T061 Accessibility audit: focus states visible on all clickable cards
- [ ] T062 Accessibility audit: screen reader test for status badges and navigation
- [ ] T063 Performance test: LCP < 2.5s on project detail pages
- [ ] T064 Performance test: verify generateStaticParams builds all pages at build time
- [ ] T065 Visual regression: compare projects page before/after (ensure no breaking changes)
- [ ] T066 Visual regression: verify Nord theme consistency on detail pages
- [ ] T067 Run through quickstart.md validation checklist
- [ ] T068 Update README if needed with project detail page navigation
- [ ] T069 Code cleanup: remove any unused imports or dead code
- [ ] T070 Final build and deploy test

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) and US1 (for visual consistency)
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) - Can start in parallel with US2
- **User Story 4 (Phase 6)**: Depends on US2 and US3 completion (needs navigation and URLs working)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

```
Setup (Phase 1) → Foundational (Phase 2) → User Stories (can parallelize)
                                          ↓
                                    US1 (P1) ─────┐
                                          ↓        ↓
                                    US2 (P2) ─→ US4 (P3)
                                          ↓        ↑
                                    US3 (P2) ─────┘
                                          ↓
                                    Polish (Phase 7)
```

**Key Insights**:
- US1 (status display) is the MVP - delivers immediate value
- US2 (navigation) and US3 (URLs) can be developed in parallel after US1
- US4 (detail page content) requires US2 and US3 to be functional
- Each story is independently testable

### Within Each User Story

**User Story 1** (Status Display):
1. Create StatusBadge component (T008, T009) - can parallelize
2. Add to ProjectCard (T010)
3. Add to Carousel (T011)
4. Test both themes (T012, T013)
5. Verify filtering (T014)

**User Story 2** (Navigation):
1. Create route structure (T015, T016, T017) - can parallelize
2. Make cards clickable (T018-T021)
3. Test navigation flows (T022-T025)

**User Story 3** (SEO URLs):
1. Implement slug utilities (T026-T028)
2. Use in components (T029-T031)
3. Add SEO metadata (T032)
4. Test URL generation (T033-T036)

**User Story 4** (Detail Content):
1. Build all ProjectDetailView sections (T037-T043) - can parallelize  
2. Integrate into page (T044)
3. Test all scenarios (T045-T055)

### Parallel Opportunities

**Phase 1 (Setup)**: All 3 tasks can run in parallel
- T001, T002, T003 - independent file modifications

**Phase 2 (Foundational)**: T001-T003 from Phase 1 must complete first, then T004-T007 run sequentially (data updates require validation)

**Phase 3 (US1)**: 
- T008 + T009 can run in parallel (StatusBadge component)
- Then T010 + T011 can run in parallel (add to existing components)
- Then T012 + T013 + T014 can run in parallel (testing)

**Phase 4 (US2)**:
- T015 + T016 + T017 can run in parallel (route structure)
- Then T018 + T019 + T020 can run together (ProjectCard updates)
- Then T021 runs (Carousel update)
- Then T022-T025 can run in parallel (testing)

**Phase 5 (US3)**:
- T026 + T027 + T028 can run in parallel (utility functions)
- Then T029 + T030 + T031 can run in parallel (use utilities)
- Then T032 runs (metadata)
- Then T033-T036 can run in parallel (testing)

**Phase 6 (US4)**:
- T037-T043 can ALL run in parallel (independent sections of ProjectDetailView)
- Then T044 runs (integration)
- Then T045-T055 can run in parallel (testing)

**Phase 7 (Polish)**:
- T056 + T057 + T058 can run in parallel (code quality)
- T059-T062 can run in parallel (accessibility audits)
- T063 + T064 can run in parallel (performance tests)
- T065 + T066 can run in parallel (visual tests)
- T067-T070 run sequentially (final validation)

---

## Parallel Example: User Story 1 (MVP)

**After Foundational Phase completes**, implement US1 in this order:

```bash
# Day 1 Morning: Create StatusBadge (parallel)
Developer A: T008 - Create StatusBadge.tsx structure
Developer A: T009 - Configure colors and variants

# Day 1 Afternoon: Integrate StatusBadge (parallel)
Developer A: T010 - Add to ProjectCard
Developer B: T011 - Add to FeaturedProjectsCarousel

# Day 2: Testing (parallel)
Developer A: T012 - Test light theme
Developer B: T013 - Test dark theme
Developer C: T014 - Test filtering

# Result: US1 complete in 2 days with 2-3 developers
# OR: 3-4 days with 1 developer working sequentially
```

---

## Parallel Example: User Story 4 (Detail Page Content)

**After US2 and US3 complete**, implement US4 in this order:

```bash
# Day 1: Build sections (all parallel - 7 developers)
Developer A: T037 - Create ProjectDetailView component
Developer B: T038 - Hero section
Developer C: T039 - Metadata grid
Developer D: T040 - Tech stack section
Developer E: T041 - CTA buttons
Developer F: T042 - Back button
Developer G: T043 - Image gallery

# Day 2 Morning: Integration
Developer A: T044 - Add to page.tsx

# Day 2 Afternoon - Day 3: Testing (all parallel - 11 tests)
All developers: T045-T055 - Various test scenarios

# Result: US4 complete in 3 days with 7 developers
# OR: 5-7 days with 1 developer working sequentially
```

---

## Summary

**Total Tasks**: 70 tasks across 7 phases

**Task Breakdown by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 4 tasks
- Phase 3 (US1 - Status Display): 7 tasks
- Phase 4 (US2 - Navigation): 11 tasks
- Phase 5 (US3 - SEO URLs): 11 tasks
- Phase 6 (US4 - Detail Content): 19 tasks
- Phase 7 (Polish): 15 tasks

**Task Breakdown by User Story**:
- US1 (P1 - Status Display): 7 tasks - **MVP Target**
- US2 (P2 - Navigation): 11 tasks
- US3 (P2 - SEO URLs): 11 tasks
- US4 (P3 - Detail Content): 19 tasks
- Infrastructure: 22 tasks (setup + foundational + polish)

**Parallel Opportunities**: 28 tasks marked [P] can run in parallel with proper staffing

**Estimated Timeline** (1 developer, sequential):
- Phase 1: 2-3 hours
- Phase 2: 2-3 hours
- Phase 3 (US1): 1 day ← **MVP Delivery Point**
- Phase 4 (US2): 2 days
- Phase 5 (US3): 2 days
- Phase 6 (US4): 3-4 days
- Phase 7 (Polish): 1-2 days
- **Total**: ~10-12 days

**Estimated Timeline** (3 developers, parallel):
- Phase 1: 1-2 hours
- Phase 2: 2 hours
- Phase 3 (US1): 0.5-1 day ← **MVP Delivery Point**
- Phase 4 (US2): 1 day
- Phase 5 (US3): 1 day (parallel with US2)
- Phase 6 (US4): 1-2 days
- Phase 7 (Polish): 1 day
- **Total**: ~5-7 days

**MVP Scope** (Fastest Value Delivery):
- Complete Phases 1-3 only (T001-T014)
- Delivers: Status badges visible on all project cards
- Timeline: 1 day (single developer) or 0.5 day (parallel team)
- Then iterate on US2-US4 based on feedback

**Independent Testing per Story**:
- **US1**: View projects page → verify status badges on all cards
- **US2**: Click any card → verify navigation to detail page with header
- **US3**: Check URL bar → verify human-readable slug format
- **US4**: View detail page → verify all sections display correctly

**Format Validation**: ✅ All 70 tasks follow strict checklist format:
- Checkbox: `- [ ]`
- Task ID: Sequential (T001-T070)
- [P] marker: On 28 parallelizable tasks
- [Story] label: On user story tasks (US1, US2, US3, US4)
- Description: With exact file paths
