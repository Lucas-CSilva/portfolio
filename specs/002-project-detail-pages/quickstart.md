# Quickstart Guide: Project Detail Pages with Enhanced Status Display

**Feature**: 002-project-detail-pages  
**Date**: December 13, 2025  
**For**: Developers implementing this feature

## Overview

This guide provides step-by-step implementation instructions for adding project status indicators and detail pages to the portfolio. Follow the phases in order to maintain constitution compliance and avoid breaking existing functionality.

## Prerequisites

- ✅ Next.js 16.0.7 project structure
- ✅ TypeScript strict mode enabled
- ✅ Existing project data in `src/data/projects.ts`
- ✅ Nord theme configured (Tailwind + MUI)
- ✅ All dependencies installed (see `package.json`)

## Implementation Phases

### Phase 1: Update Data Model (30 min)

**Goal**: Add status field to existing projects and update type definitions

#### Step 1.1: Update Type Definitions

Edit `src/lib/types.ts`:

```typescript
// Add new status type
export type ProjectStatus = 'completed' | 'in-progress' | 'to-do';

// Update Project interface
export interface Project {
  // ... existing fields ...
  status: ProjectStatus; // ADD THIS (required)
  images?: string[];     // ADD THIS (optional)
  createdAt?: string | Date; // ADD THIS (optional)
  updatedAt?: string | Date; // ADD THIS (optional)
}
```

#### Step 1.2: Add Status to Project Data

Edit `src/data/projects.ts` to add `status` field to all projects:

```typescript
export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: '...',
    status: 'completed', // ADD THIS
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    // ... other fields ...
  },
  // Repeat for all projects
];
```

**Status Assignment Guide**:
- `'completed'`: Has live URL or repo, fully functional
- `'in-progress'`: Currently being developed
- `'to-do'`: Planned but not started

#### Step 1.3: Create Slug Utility

Create or update `src/lib/projects.ts`:

```typescript
import type { Project } from './types';

/**
 * Generate URL-safe slug from project title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Validate that all project slugs are unique
 * Throws error if duplicates found
 */
export function validateSlugUniqueness(projects: Project[]): void {
  const slugs = new Set<string>();
  const duplicates: string[] = [];

  projects.forEach((project) => {
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

/**
 * Find project by slug
 */
export function findProjectBySlug(
  projects: Project[],
  slug: string
): Project | undefined {
  return projects.find((p) => generateSlug(p.title) === slug);
}
```

**Validation**: Run `validateSlugUniqueness(projects)` in your app to ensure no conflicts.

---

### Phase 2: Create StatusBadge Component (45 min)

**Goal**: Build reusable status indicator component using Nord colors

#### Step 2.1: Create Component File

Create `src/components/projects/StatusBadge.tsx`:

```typescript
'use client';

import { Chip } from '@mui/material';
import { CheckCircle, PlayCircle, Circle } from '@mui/icons-material';
import type { ProjectStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'small' | 'medium';
  sx?: any; // MUI SxProps
}

const statusConfig = {
  completed: {
    color: 'success' as const,
    icon: CheckCircle,
    label: 'Completed',
  },
  'in-progress': {
    color: 'warning' as const,
    icon: PlayCircle,
    label: 'In Progress',
  },
  'to-do': {
    color: 'info' as const,
    icon: Circle,
    label: 'To-Do',
  },
} as const;

export function StatusBadge({ status, size = 'medium', sx = {} }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Chip
      icon={<Icon />}
      label={config.label}
      color={config.color}
      size={size}
      sx={{
        fontWeight: 500,
        ...sx,
      }}
    />
  );
}
```

**Testing**:
- Verify badge displays in both light and dark themes (MUI handles automatically)
- Check that colors match Nord theme tokens (success=nord-14, warning=nord-13, info=nord-9)
- Test all three status variants (completed, in-progress, to-do)
- Verify icon displays correctly at both sizes

---

### Phase 3: Update Project Cards (60 min)

**Goal**: Add status badges and click handlers to existing project cards

#### Step 3.1: Update ProjectCard Component

Edit `src/components/projects/ProjectCard.tsx`:

```typescript
'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { StatusBadge } from './StatusBadge';
import { generateSlug } from '@/lib/projects';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  clickable?: boolean;
}

export function ProjectCard({ project, clickable = true }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (clickable) {
      const slug = generateSlug(project.title);
      router.push(`/projects/${slug}`);
    }
  };

  return (
    <Card
      onClick={handleClick}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          handleClick();
        }
      }}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      sx={{
        cursor: clickable ? 'pointer' : 'default',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': clickable ? {
          transform: 'scale(1.02)',
        } : {},
      }}
    >
      <CardContent>
        {/* Add status badge at top */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <StatusBadge status={project.status} size="small" />
        </Box>

        {/* Existing card content */}
        <Typography variant="h5" component="h3" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        {/* ... rest of card content using MUI components ... */}
      </CardContent>
    </Card>
  );
}
```

**Key Points**:
- Use `'use client'` directive (needs router hooks and MUI components)
- MUI components handle keyboard navigation automatically
- Use MUI `sx` prop for all styling (MUI-first approach)
- Use theme tokens from `muiTheme.ts` for colors (Nord palette)
- Avoid Tailwind classes when MUI can achieve the same result

#### Step 3.2: Update FeaturedProjectsCarousel

Edit `src/components/sections/FeaturedProjectsCarousel.tsx`:

```typescript
// Similar changes as ProjectCard:
// 1. Import StatusBadge
// 2. Add status badge to carousel items
// 3. Add click handler with router.push()
// 4. Ensure keyboard navigation works
```

---

### Phase 4: Create Project Detail Page (90 min)

**Goal**: Implement dynamic route and comprehensive detail view

#### Step 4.1: Create Dynamic Route Page

Create `src/app/projects/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { findProjectBySlug, generateSlug } from '@/lib/projects';
import { ProjectDetailView } from '@/components/sections/ProjectDetailView';

interface PageProps {
  params: { slug: string };
}

// Generate static paths for all projects (SSG optimization)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: generateSlug(project.title),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const project = findProjectBySlug(projects, params.slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

// Server Component (no 'use client')
export default function ProjectPage({ params }: PageProps) {
  const project = findProjectBySlug(projects, params.slug);

  if (!project) {
    notFound(); // Triggers not-found.tsx
  }

  return <ProjectDetailView project={project} />;
}
```

#### Step 4.2: Create Not Found Handler

Create `src/app/projects/[slug]/not-found.tsx`:

```typescript
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          py: 10,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Project Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The project you're looking for doesn't exist or has been removed.
        </Typography>
        <Button
          component={Link}
          href="/#projects"
          variant="contained"
          size="large"
        >
          Back to Projects
        </Button>
      </Box>
    </Container>
  );
}
```

#### Step 4.3: Create ProjectDetailView Component

Create `src/components/sections/ProjectDetailView.tsx`:

```typescript
'use client';

import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ArrowBack, OpenInNew, GitHub } from '@mui/icons-material';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { TechBadge } from '@/components/ui/TechBadge';
import type { Project } from '@/lib/types';

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back to Projects
      </Button>

      {/* Hero Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="h2" component="h1">
            {project.title}
          </Typography>
          <StatusBadge status={project.status} size="medium" />
        </Box>
        <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
          {project.description}
        </Typography>
      </Box>

      {/* Metadata Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Status
          </Typography>
          <StatusBadge status={project.status} size="small" />
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Technologies
          </Typography>
          <Typography variant="body1">
            {project.technologies.length} used
          </Typography>
        </Grid>
        {/* Add more metadata as needed */}
      </Grid>

      {/* Technology Stack */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Technology Stack
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </Box>
      </Box>

      {/* Call-to-Action Buttons */}
      {(project.liveUrl || project.repoUrl) && (
        <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <Button
              variant="contained"
              startIcon={<OpenInNew />}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source Code
            </Button>
          )}
        </Box>
      )}

      {/* Image Gallery (if images exist) */}
      {project.images && project.images.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Gallery
          </Typography>
          <Grid container spacing={2}>
            {project.images.map((image, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box
                  component="img"
                  src={image}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
```

**Creative Enhancements**:
- Add breadcrumb navigation
- Show related projects based on shared technologies
- Add social share buttons
- Display creation/update dates if available
- Add scroll-to-top button for long pages

---

### Phase 5: Testing & Validation (30 min)

#### Checklist

**Data Validation**:
- [ ] All projects have `status` field
- [ ] Run slug uniqueness validation (no errors)
- [ ] TypeScript compiles without errors

**Visual Testing**:
- [ ] Status badges display correctly in light theme
- [ ] Status badges display correctly in dark theme
- [ ] Status badge colors have adequate contrast (WCAG AA)
- [ ] Project cards show status badges in gallery
- [ ] Featured carousel shows status badges

**Navigation Testing**:
- [ ] Clicking project card navigates to detail page
- [ ] URL matches pattern `/projects/[slug]`
- [ ] Detail page displays all project information
- [ ] Back button returns to projects page
- [ ] Browser back/forward buttons work correctly
- [ ] Keyboard navigation works (Tab, Enter, Space)

**Edge Case Testing**:
- [ ] Invalid slug shows 404 page (e.g., `/projects/nonexistent`)
- [ ] 404 page has "Back to Projects" link
- [ ] Deep-linking to project URL works (share URL, paste in browser)
- [ ] Projects with no URLs don't show broken CTA buttons
- [ ] Projects with missing images don't break layout

**Responsive Testing**:
- [ ] Detail page looks good on mobile (< 640px)
- [ ] Detail page looks good on tablet (640-1024px)
- [ ] Detail page looks good on desktop (> 1024px)
- [ ] Status badges scale appropriately on mobile

**Performance Testing**:
- [ ] Page load time < 3 seconds on broadband
- [ ] LCP < 2.5 seconds (use Lighthouse)
- [ ] No console errors or warnings
- [ ] No hydration mismatches (server vs client)

---

## Common Issues & Solutions

### Issue: Slug Collision Error

**Problem**: Two projects generate the same slug

**Solution**: Rename one project title to be more distinctive, or add manual slug override field

### Issue: Status Badge Not Showing

**Problem**: Badge doesn't render on card

**Solution**: Check that:
1. Project has `status` field in data
2. `StatusBadge` is imported correctly
3. Component is using `'use client'` directive (if needed)

### Issue: Navigation Not Working

**Problem**: Clicking card doesn't navigate

**Solution**: Verify:
1. `router.push()` is called with correct slug
2. Dynamic route file exists at `app/projects/[slug]/page.tsx`
3. `generateSlug()` produces valid URL-safe string

### Issue: Dark Mode Colors Wrong

**Problem**: Status badges look bad in dark theme

**Solution**: Ensure using Nord colors only (nord0-nord15), Tailwind handles theme transitions automatically

### Issue: 404 Instead of Project Page

**Problem**: Valid project URL shows 404

**Solution**: Check:
1. Slug generation matches between card click and page route
2. `findProjectBySlug()` uses same algorithm
3. `generateStaticParams()` includes all projects

---

## Performance Optimization Tips

1. **Use generateStaticParams()**: Pre-render all project pages at build time (SSG)
2. **Optimize Images**: Use Next.js `<Image>` component with proper sizing
3. **Lazy Load Gallery**: If project has many images, implement lazy loading
4. **Code Split**: Keep `ProjectDetailView` as separate component (automatic code splitting)
5. **Minimize Client JS**: Keep page component as Server Component, only leaf components need `'use client'`

---

## Next Steps

After completing this implementation:

1. Run `/speckit.tasks` to generate detailed task breakdown
2. Review constitution compliance (all gates should pass)
3. Consider enhancements:
   - Add filtering by status on projects page
   - Implement project search by status
   - Add analytics tracking for project views
   - Create admin interface for updating project status

---

## Support & References

- **Specification**: [spec.md](spec.md)
- **Data Model**: [data-model.md](data-model.md)
- **Type Contracts**: [contracts/types.ts](contracts/types.ts)
- **Research Findings**: [research.md](research.md)
- **Constitution**: [/.specify/memory/constitution.md](../../.specify/memory/constitution.md)

For questions or issues, refer to the research document for design decisions and rationale.
