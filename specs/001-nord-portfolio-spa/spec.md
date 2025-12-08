# Feature Specification: Nord Portfolio SPA

**Feature Branch**: `001-nord-portfolio-spa`  
**Created**: 2025-12-08  
**Status**: Draft  
**Input**: User description: "Especifique um portf??lio de p??gina ??nica (SPA) de alta performance. O design deve aderir estritamente ao tema 'Nord' conforme a constitui????o. O sistema deve incluir: 1. Hero Section: Apresenta????o minimalista com tipografia hier??rquica clara. 2. Adaptive Project Gallery: Uma grade de cards de projetos que exibe detalhes t??cnicos. Requisito Cr??tico de UX: Em desktop, exibe-se como um Grid responsivo; em mobile, transforma-se automaticamente em um Carrossel horizontal com suporte a gestos de swipe (touch-native) utilizando Embla Carousel. 3. Filtragem Profunda: Capacidade de filtrar projetos por tecnologia (ex: React, Node.js), com reflexo imediato na URL (URL-First State). 4. Theme Toggle Flicker-Free: Altern??ncia robusta entre temas Claro (Snow Storm) e Escuro (Polar Night), persistente e sem 'flash' na carga. 5. Performance: Core Web Vitals otimizados e uso de Server Components por padr??o."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Portfolio Content (Priority: P1)

A visitor lands on the portfolio site and immediately sees a professional presentation with the hero section displaying name, title, and brief introduction. The visitor scrolls through the page to view the complete portfolio including projects gallery, reading project descriptions and technical details without any interaction required.

**Why this priority**: This is the foundational experience - the absolute minimum viable product. A portfolio must first be viewable before any interactive features matter. This establishes the content structure and visual hierarchy that all other features build upon.

**Independent Test**: Can be fully tested by loading the page and scrolling through all content. Delivers immediate value as a static, readable portfolio showcasing work and skills.

**Acceptance Scenarios**:

1. **Given** a visitor opens the portfolio URL, **When** the page loads, **Then** the hero section displays prominently with name, title/role, and a concise introduction using clear typographic hierarchy
2. **Given** the page has loaded, **When** the visitor scrolls down, **Then** they see a grid of project cards displaying project names, descriptions, and technology tags
3. **Given** the visitor is viewing project cards, **When** they read the content, **Then** each card shows a clear title, brief description (2-3 sentences), and visible technology tags
4. **Given** the page is in light theme by default, **When** content is displayed, **Then** all colors strictly use Nord theme variables (Snow Storm palette for light mode)
5. **Given** the page loads on desktop (>768px width), **When** viewing the projects section, **Then** projects display as a responsive grid (2-3 columns depending on viewport)
6. **Given** the page loads on mobile (<768px width), **When** viewing the projects section, **Then** projects display as a horizontal carousel with visible swipe affordance

---

### User Story 2 - Filter Projects by Technology (Priority: P2)

A visitor wants to see specific types of work and clicks on a technology filter (e.g., "React" or "Node.js"). The gallery immediately updates to show only projects using that technology, and the URL updates to reflect the active filter, allowing the visitor to bookmark or share the filtered view.

**Why this priority**: This is the first layer of interactivity that adds significant value. While viewing all projects is useful, filtering enables visitors to quickly find relevant work for their specific interests (e.g., recruiters looking for specific tech skills).

**Independent Test**: Can be tested by clicking any technology filter and verifying that: (1) only matching projects display, (2) the URL updates with the filter parameter, (3) sharing the URL loads the filtered view directly.

**Acceptance Scenarios**:

1. **Given** the visitor is viewing the full projects gallery, **When** they click a technology filter button (e.g., "React"), **Then** the gallery instantly filters to show only projects tagged with that technology
2. **Given** a filter has been applied, **When** the gallery updates, **Then** the URL changes to include the filter parameter (e.g., `?tech=react`)
3. **Given** a filtered URL (e.g., `?tech=react`), **When** a visitor loads that URL directly, **Then** the page loads with the filter already applied
4. **Given** a filter is active, **When** the visitor clicks the same filter again or an "All" option, **Then** the filter is removed, all projects display, and the URL parameter is cleared
5. **Given** multiple technologies are available for filtering, **When** filters are displayed, **Then** the count of projects for each technology is visible
6. **Given** the visitor applies a filter, **When** the browser back button is pressed, **Then** the previous filter state (or unfiltered state) is restored

---

### User Story 3 - Switch Between Light and Dark Themes (Priority: P3)

A visitor who prefers dark mode clicks the theme toggle control. The entire interface smoothly transitions from light to dark (or vice versa) using the Nord Polar Night and Snow Storm palettes. The preference is saved so returning visitors see their preferred theme immediately without any flash of the opposite theme.

**Why this priority**: While important for user experience and accessibility, the portfolio is fully functional without theme switching. This is an enhancement that improves comfort and demonstrates attention to detail, but is not blocking for the core portfolio purpose.

**Independent Test**: Can be tested by clicking the theme toggle and verifying: (1) colors transition smoothly, (2) preference persists after page reload, (3) no flash of wrong theme occurs on initial load.

**Acceptance Scenarios**:

1. **Given** the portfolio is loaded in light mode, **When** the visitor clicks the theme toggle control, **Then** all colors smoothly transition to the Nord dark theme (Polar Night palette)
2. **Given** the visitor has selected dark mode, **When** they reload the page, **Then** the page loads directly in dark mode without any flash of light theme
3. **Given** the visitor has selected a theme preference, **When** they close and reopen the browser, **Then** their theme preference persists
4. **Given** the visitor has no saved preference, **When** they first load the page, **Then** the theme defaults to the system preference (prefers-color-scheme)
5. **Given** the theme toggle is visible, **When** the visitor interacts with it, **Then** it shows clear visual feedback indicating the current theme and toggle state
6. **Given** the theme changes, **When** the transition occurs, **Then** all Nord color variables update cohesively with no individual element "flickering" or updating at different times

---

### User Story 4 - Navigate Projects via Touch Gestures (Mobile) (Priority: P2)

A mobile visitor views the projects gallery as a horizontal carousel and uses natural swipe gestures (left/right) to browse through project cards. The carousel responds smoothly to touch input, snapping to card boundaries, and providing clear visual indicators of position within the collection.

**Why this priority**: This is critical for mobile UX but doesn't affect desktop users. Given mobile traffic typically represents 50%+ of web users, this is high priority but secondary to the basic viewing experience (P1). It's more important than theme switching since it's tied to core content navigation on a major platform.

**Independent Test**: Can be tested on mobile device or mobile emulator by swiping left/right on the projects section and verifying smooth scrolling, snap behavior, and position indicators.

**Acceptance Scenarios**:

1. **Given** a mobile visitor (<768px viewport) views the projects section, **When** they swipe left on the carousel, **Then** the carousel smoothly scrolls to reveal the next project card
2. **Given** the visitor is swiping through projects, **When** they release their finger, **Then** the carousel snaps to align the nearest card to a consistent position
3. **Given** the carousel contains multiple projects, **When** displayed on mobile, **Then** visual indicators (dots or progress) show the current position and total number of projects
4. **Given** the visitor reaches the end of the carousel, **When** they attempt to swipe further in that direction, **Then** the carousel provides appropriate feedback (bounce effect or visual indication of endpoint)
5. **Given** the visitor is swiping through the carousel, **When** a filter is applied, **Then** the carousel resets to show the first filtered project with updated position indicators
6. **Given** the carousel is displayed, **When** the visitor taps directly on a visible project card, **Then** the action is registered without triggering swipe behavior

---

### Edge Cases

- **What happens when no projects match the selected filter?** Display a clear "No projects found" message with the active filter shown, and provide easy access to clear the filter or view all projects.

- **What happens when the visitor has JavaScript disabled?** The portfolio should still display all content in a readable, accessible format (progressive enhancement). The gallery shows as a static grid, filters are hidden or non-functional, and theme respects system preference via CSS media queries only.

- **How does the system handle very long project descriptions?** Project card descriptions are truncated to a maximum of 3 lines with an ellipsis. Full descriptions can be viewed by clicking the card (future enhancement) or descriptions should be editorially controlled to fit within the constraint.

- **What happens on intermediate screen sizes (tablets ~768-1024px)?** The grid adjusts responsively, typically showing 2 columns on tablet portrait and 3 columns on tablet landscape. The carousel-to-grid breakpoint is clearly defined at 768px.

- **How does the theme toggle handle rapid clicking?** The toggle is debounced to prevent storage thrashing and ensure smooth transitions. Multiple rapid clicks do not trigger multiple transitions.

- **What happens when the browser doesn't support local storage?** Theme preference falls back to system preference only, with the toggle still functional for the current session but not persisting across page loads.

- **How does the system handle missing or malformed project data?** Each project card gracefully handles missing fields: missing image shows a Nord-themed placeholder, missing technologies show an empty tag area, missing description shows minimal metadata only.

## Requirements *(mandatory)*

### Functional Requirements

#### Content & Structure

- **FR-001**: System MUST display a hero section as the first viewport content containing: portfolio owner's name, professional title/role, and a brief introduction (2-4 sentences)
- **FR-002**: System MUST display a projects gallery section containing multiple project cards arranged in a layout that adapts to viewport size
- **FR-003**: Each project card MUST display: project title, brief description (2-3 sentences), and a list of technology tags
- **FR-004**: System MUST support a minimum of 6 project entries and scale to display 20+ projects without performance degradation

#### Responsive Layout & Adaptive UI

- **FR-005**: On viewport widths ???768px, the projects gallery MUST display as a CSS Grid with 2-3 columns that adjusts based on available space
- **FR-006**: On viewport widths <768px, the projects gallery MUST display as a horizontal carousel with swipe gesture support
- **FR-007**: The mobile carousel MUST support native touch gestures: horizontal swipe left/right to navigate between project cards
- **FR-008**: The mobile carousel MUST snap to card boundaries when swipe gesture ends, aligning cards to a consistent position
- **FR-009**: The mobile carousel MUST display visual position indicators showing current position and total number of items
- **FR-010**: The hero section MUST adapt typography sizing and spacing for mobile (<768px) and desktop (???768px) viewports

#### Filtering & URL State

- **FR-011**: System MUST provide interactive filter controls for each unique technology represented in the projects data
- **FR-012**: When a technology filter is activated, the projects gallery MUST immediately update to display only projects containing that technology tag
- **FR-013**: System MUST reflect the active filter state in the URL using query parameters (format: `?tech=<technology-name>`)
- **FR-014**: When loading a URL with filter parameters, the system MUST initialize with that filter already applied
- **FR-015**: System MUST provide a mechanism to clear all active filters and return to the unfiltered view
- **FR-016**: Browser back/forward navigation MUST correctly restore previous filter states
- **FR-017**: Filter controls MUST display the count of projects associated with each technology

#### Theme System

- **FR-018**: System MUST support two color themes: Light (Nord Snow Storm palette: nord6, nord5, nord4) and Dark (Nord Polar Night palette: nord0, nord1, nord2, nord3)
- **FR-019**: System MUST provide a visible, accessible theme toggle control available on all viewport sizes
- **FR-020**: When theme toggle is activated, all colors MUST transition atomically (no partial updates or flicker)
- **FR-021**: System MUST persist theme preference using browser storage so returning visitors see their chosen theme
- **FR-022**: On first visit with no saved preference, system MUST default to the user's system theme preference (prefers-color-scheme media query)
- **FR-023**: Page MUST load with the correct theme immediately (no flash of unstyled content or wrong theme)
- **FR-024**: All color values MUST use Nord theme color variables exclusively (nord0-nord15) - no arbitrary hex codes

#### Performance & Architecture

- **FR-025**: System MUST use Server Components as the default rendering strategy for all non-interactive components
- **FR-026**: The `'use client'` directive MUST only be used in leaf components that require interactivity (theme toggle, filter controls, carousel navigation)
- **FR-027**: Largest Contentful Paint (LCP) MUST occur within 2.5 seconds on a 3G connection
- **FR-028**: First Input Delay (FID) MUST be under 100ms for all interactive elements
- **FR-029**: Cumulative Layout Shift (CLS) MUST be under 0.1 throughout the page lifecycle
- **FR-030**: System MUST lazy-load project images below the fold to optimize initial page load

#### Accessibility

- **FR-031**: All interactive elements (filters, theme toggle, carousel controls) MUST have visible focus states with sufficient contrast (WCAG AA: 3:1 minimum)
- **FR-032**: All interactive elements MUST be keyboard accessible with logical tab order
- **FR-033**: The theme toggle MUST have appropriate ARIA labels indicating current state and available action
- **FR-034**: Filter controls MUST have appropriate ARIA roles and state attributes indicating active/inactive state
- **FR-035**: The mobile carousel MUST have appropriate ARIA live regions announcing position changes to screen readers
- **FR-036**: All text content MUST maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text) in both light and dark themes

### Key Entities

- **Project**: Represents a portfolio work item with attributes: unique identifier, title, description (text, 2-3 sentences), collection of technology tags (strings), optional image reference, optional live URL, optional repository URL, display order/priority

- **Technology Filter**: Represents a filterable technology category derived from project tags, with attributes: technology name (string, e.g., "React", "Node.js"), count of associated projects, active/inactive state, URL parameter representation

- **Theme Preference**: Represents user's color theme choice with attributes: theme identifier (light/dark), persistence mechanism (storage key), timestamp of last update

## Success Criteria *(mandatory)*

### Measurable Outcomes

#### Performance Metrics

- **SC-001**: Page achieves Largest Contentful Paint (LCP) under 2.5 seconds on 3G connection (measured via Lighthouse)
- **SC-002**: Page achieves First Input Delay (FID) under 100ms for all interactive elements (measured via Chrome DevTools)
- **SC-003**: Page achieves Cumulative Layout Shift (CLS) score under 0.1 throughout page lifecycle (measured via Lighthouse)
- **SC-004**: Initial JavaScript bundle size is under 100KB (gzipped) for the critical path
- **SC-005**: Time to Interactive (TTI) is under 3.5 seconds on 3G connection
- **SC-006**: Page achieves Lighthouse Performance score of 90 or higher

#### User Experience Metrics

- **SC-007**: Users can view the complete portfolio content (hero section + all projects) within 3 seconds of page load
- **SC-008**: Filter activation updates the gallery view within 100ms of user interaction
- **SC-009**: Theme toggle transitions complete within 300ms with zero visual flicker or partial updates
- **SC-010**: Mobile carousel responds to swipe gestures with less than 16ms frame time (60fps) throughout the gesture
- **SC-011**: Theme preference persists across 100% of browser sessions (verified via storage mechanism)
- **SC-012**: Shared filtered URLs load with correct filter applied 100% of the time

#### Accessibility Metrics

- **SC-013**: All interactive elements have focus indicators visible with minimum 3:1 contrast ratio against background
- **SC-014**: Page achieves WCAG AA compliance (minimum 4.5:1 text contrast) in both light and dark themes
- **SC-015**: All functionality is accessible via keyboard navigation with logical tab order
- **SC-016**: Page achieves Lighthouse Accessibility score of 95 or higher

#### Constitution Compliance

- **SC-017**: 100% of color values use Nord theme variables (zero arbitrary hex codes in codebase)
- **SC-018**: All layout and page components are Server Components (no `'use client'` directive in non-leaf components)
- **SC-019**: All filter state is reflected in URL with zero use of local state for filter values
- **SC-020**: Theme toggle mechanism prevents FOUC (Flash of Unstyled Content) on 100% of page loads

## Assumptions

1. **Content Source**: Project data will be statically defined (e.g., in a TypeScript/JSON file) and does not require a CMS or database integration at launch
2. **Project Count**: Portfolio will contain between 6-20 projects at launch, allowing for reasonable filter utility without pagination
3. **Technology Tags**: Each project will have 2-6 technology tags, and total unique technologies across all projects will be 8-15
4. **Image Assets**: Project images will be optimized and provided in appropriate formats (WebP with fallbacks) at reasonable dimensions (~800x600px max)
5. **Browser Support**: Modern browsers (last 2 versions of Chrome, Firefox, Safari, Edge) with focus on mobile Safari and Chrome Mobile due to carousel requirements
6. **Embla Carousel**: Use of Embla Carousel library for mobile carousel is pre-approved as it's headless (no opinionated styling) and lightweight
7. **Storage Mechanism**: Browser localStorage is available for theme persistence, with graceful fallback to session-only preferences if unavailable
8. **Single Page**: Portfolio is truly a single page (no routing to separate project detail pages), though this may be enhanced in future iterations
9. **No Authentication**: Portfolio is publicly accessible with no authentication or user accounts required
10. **Static Deployment**: Portfolio will be deployed as a static site (e.g., Vercel, Netlify) leveraging Next.js static generation capabilities

## Out of Scope

The following features are explicitly excluded from this specification and may be considered for future iterations:

1. **Project Detail Modal/Page**: Clicking on project cards to view expanded details
2. **Contact Form**: Dedicated contact or inquiry form
3. **Blog/Articles Section**: Additional content beyond portfolio projects
4. **Multi-language Support**: Internationalization (i18n) for multiple languages
5. **Admin/CMS Interface**: Interface for updating project content without code changes
6. **Search Functionality**: Full-text search across projects (filtering by technology is in scope)
7. **Project Categories**: Grouping projects beyond technology tags (e.g., "Professional", "Personal", "Open Source")
8. **Animations Beyond Transitions**: Complex scroll animations, parallax effects, or decorative animations
9. **Social Media Integration**: Live feeds, share buttons, or embedded social content
10. **Analytics Dashboard**: Built-in analytics beyond standard third-party integration (e.g., Google Analytics)
11. **Print Stylesheet**: Optimized print version of the portfolio
12. **Multiple Filter Selection**: Ability to filter by multiple technologies simultaneously (single filter selection is in scope)
