# Data Model: Nord Portfolio SPA

**Feature**: 001-nord-portfolio-spa  
**Date**: 2025-12-08  
**Purpose**: Define data structures and relationships for portfolio content

## Entity Definitions

### 1. Project

Represents a portfolio work item displayed in the gallery.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| `id` | string | Yes | Unique identifier | Alphanumeric, kebab-case (e.g., "project-1") |
| `title` | string | Yes | Project name | 1-60 characters |
| `description` | string | Yes | Brief project summary | 50-200 characters (2-3 sentences) |
| `technologies` | string[] | Yes | Technology tags | Array of 2-6 strings, each 2-20 characters |
| `image` | string | No | Image filename | Filename with extension (e.g., "project-1.webp") |
| `blurDataURL` | string | No | Blur placeholder data URI | Base64-encoded JPEG data URI |
| `liveUrl` | string | No | Live deployment URL | Valid HTTPS URL |
| `repoUrl` | string | No | Repository URL | Valid HTTPS URL (GitHub, GitLab, etc.) |
| `order` | number | Yes | Display priority | Integer, lower = higher priority |
| `featured` | boolean | No | Featured project flag | Default: false |

**Relationships**:
- **Technology Tags**: Each project has multiple technologies (many-to-many conceptually, implemented as string array)
- **No explicit relationships**: Projects are independent entities

**Example**:
```typescript
{
  id: "ecommerce-platform",
  title: "E-Commerce Platform",
  description: "A modern e-commerce solution built with Next.js and Stripe. Features include product catalog, shopping cart, and secure checkout.",
  technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
  image: "ecommerce-platform.webp",
  blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  liveUrl: "https://demo.ecommerce.example.com",
  repoUrl: "https://github.com/username/ecommerce-platform",
  order: 1,
  featured: true
}
```

**State Transitions**: None (static data, no lifecycle)

---

### 2. Technology

Represents a filterable technology category derived from project tags.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| `name` | string | Yes | Technology name | 2-20 characters, matches project tag exactly |
| `count` | number | Yes (computed) | Number of projects using this technology | Integer ≥ 0 |
| `slug` | string | Yes (computed) | URL-safe version of name | Lowercase, alphanumeric with hyphens |

**Relationships**:
- **Projects**: Derived from project `technologies` arrays (computed relationship)

**Example**:
```typescript
{
  name: "Next.js",
  count: 8,
  slug: "nextjs"
}
```

**Computation Logic**:
```typescript
function getTechnologies(projects: Project[]): Technology[] {
  const techMap = new Map<string, number>();
  
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      techMap.set(tech, (techMap.get(tech) || 0) + 1);
    });
  });
  
  return Array.from(techMap.entries()).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
}
```

**State Transitions**: Recalculated whenever project list changes

---

### 3. Theme Preference

Represents user's color theme choice.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| `theme` | 'light' \| 'dark' \| 'system' | Yes | Active theme | One of three enum values |
| `storageKey` | string | Yes | localStorage key | Default: "portfolio-theme" |
| `timestamp` | number | No | Last update time | Unix timestamp (ms) |

**Relationships**: None (independent user preference)

**Example**:
```typescript
{
  theme: "dark",
  storageKey: "portfolio-theme",
  timestamp: 1702041600000
}
```

**Storage Format** (localStorage):
```json
{
  "portfolio-theme": "dark"
}
```

**State Transitions**:
1. **Initial State**: `system` (respects OS preference)
2. **User Toggle**: Transitions between `light` ↔ `dark`
3. **Persistence**: Saved to localStorage on each change

---

### 4. Filter State

Represents active technology filter in URL.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| `activeTechnology` | string \| null | No | Currently filtered technology | Must match a technology slug, or null |

**Relationships**:
- **Technology**: References a technology by slug
- **Projects**: Filters project list when active

**URL Representation**:
```
No filter: /
Active filter: /?tech=nextjs
```

**Example**:
```typescript
{
  activeTechnology: "nextjs"  // Filters to show only Next.js projects
}
```

**State Transitions**:
1. **No Filter** (`null`): Show all projects
2. **Filter Active** (`"nextjs"`): Show projects where `technologies` includes "Next.js"
3. **Toggle**: Clicking active filter clears it, clicking inactive filter sets it

**Filtering Logic**:
```typescript
function filterProjects(projects: Project[], tech: string | null): Project[] {
  if (!tech) return projects;
  
  return projects.filter(project =>
    project.technologies.some(t => 
      t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === tech
    )
  );
}
```

---

## Data Flow

### Read Flow (Server-Side)

```
1. User requests page (e.g., /?tech=nextjs)
2. Next.js parses searchParams
3. Page component reads static project data
4. Page filters projects based on searchParams.tech
5. Page passes filtered projects to child components
6. Server Components render with filtered data
```

### Write Flow (Client-Side)

```
1. User clicks filter button
2. FilterControls component handles onClick
3. Component reads current searchParams
4. Component toggles tech parameter
5. Component calls router.replace() with new URL
6. Next.js triggers server-side re-render with new searchParams
7. Page re-renders with updated filtered projects
```

### Theme Flow

```
1. User clicks theme toggle
2. ThemeToggle component calls setTheme()
3. next-themes updates localStorage and <html> class
4. CSS variables cascade to all components
5. Theme persists across sessions
```

---

## Data Validation Rules

### Project Validation

```typescript
interface ProjectValidation {
  id: RegExp;        // /^[a-z0-9-]+$/
  title: {
    minLength: 1;
    maxLength: 60;
  };
  description: {
    minLength: 50;
    maxLength: 200;
  };
  technologies: {
    minItems: 2;
    maxItems: 6;
    itemLength: { min: 2, max: 20 };
  };
  order: {
    min: 0;
    type: 'integer';
  };
}
```

### Technology Validation

```typescript
interface TechnologyValidation {
  name: {
    minLength: 2;
    maxLength: 20;
  };
  count: {
    min: 0;
    type: 'integer';
  };
  slug: RegExp;  // /^[a-z0-9-]+$/
}
```

---

## Sample Dataset

Minimum viable dataset for testing (6 projects, 8 technologies):

```typescript
const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js App Router and Nord theme. Features server-first architecture and URL-based filtering.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    image: "portfolio.webp",
    order: 1,
    featured: true,
  },
  {
    id: "task-manager",
    title: "Task Management App",
    description: "Full-stack task manager with real-time updates and collaborative features. Built with Next.js and PostgreSQL.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "task-manager.webp",
    liveUrl: "https://tasks.example.com",
    order: 2,
  },
  {
    id: "api-service",
    title: "RESTful API Service",
    description: "High-performance API service handling 10k requests per second. Implements rate limiting and caching strategies.",
    technologies: ["Node.js", "TypeScript", "Redis", "Express"],
    repoUrl: "https://github.com/username/api-service",
    order: 3,
  },
  {
    id: "mobile-app",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for tracking workouts and nutrition. Syncs with popular fitness devices via Bluetooth.",
    technologies: ["React Native", "TypeScript", "Firebase"],
    image: "fitness-tracker.webp",
    liveUrl: "https://apps.apple.com/app/fitness-tracker",
    order: 4,
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and customizable widgets. Processes millions of data points daily.",
    technologies: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
    image: "dashboard.webp",
    order: 5,
  },
  {
    id: "cli-tool",
    title: "Developer CLI Tool",
    description: "Command-line tool for automating development workflows. Supports plugins and custom configurations.",
    technologies: ["Node.js", "TypeScript"],
    repoUrl: "https://github.com/username/cli-tool",
    order: 6,
  },
];
```

**Derived Technologies** (from above dataset):
- Next.js (2 projects)
- TypeScript (6 projects)
- Tailwind CSS (2 projects)
- React (2 projects)
- PostgreSQL (1 project)
- Node.js (2 projects)
- React Native (1 project)
- Firebase (1 project)

---

## Storage Strategy

### Static Data (Build Time)

**Location**: `src/data/projects.ts`

**Format**: TypeScript module with exported constant

```typescript
// src/data/projects.ts
export const projects: Project[] = [
  // ... project data
];
```

**Benefits**:
- Type-safe at compile time
- No runtime parsing overhead
- Bundled with application code
- Easy to update via code editor

**Limitation**: Requires rebuild to update content (acceptable for initial MVP)

### User Preferences (Runtime)

**Location**: Browser localStorage

**Keys**:
- `portfolio-theme`: Theme preference ("light" | "dark" | "system")

**Benefits**:
- Persists across sessions
- No server-side storage needed
- Privacy-friendly (no tracking)

**Fallback**: System preference via `prefers-color-scheme` media query

---

## Future Considerations

### CMS Integration (Out of Scope)

If content management is needed in future iterations:

**Options**:
1. **Headless CMS**: Contentful, Sanity, or Strapi
2. **File-based**: MDX files with frontmatter
3. **Database**: PostgreSQL with admin interface

**Migration Path**: Keep TypeScript interfaces, change data source from static import to API fetch.

### Performance Optimization

**Current**: All project data loaded at build time (negligible size for 6-20 projects)

**Future**: If scaling beyond 50 projects:
- Implement pagination
- Add search indexing
- Consider on-demand loading

---

## Summary

**Entities Defined**: 4 (Project, Technology, Theme Preference, Filter State)  
**Relationships**: Minimal (projects are independent, technologies are derived)  
**Storage**: Static TypeScript files + browser localStorage  
**Validation**: Type-safe via TypeScript interfaces  
**Sample Data**: 6 projects, 8 technologies (ready for testing)

**Next Step**: Define contracts (TypeScript interfaces) in Phase 1.
