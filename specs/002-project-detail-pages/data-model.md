# Data Model: Project Detail Pages with Enhanced Status Display

**Feature**: 002-project-detail-pages  
**Date**: December 13, 2025  
**Phase**: 1 - Design

## Purpose

This document defines the data entities, their attributes, relationships, and validation rules required to implement project status display and detail pages. All models are derived from functional requirements in the specification.

## Entities

### 1. Project (Enhanced)

**Description**: Represents a portfolio project with comprehensive information for display in gallery, carousel, and detail pages.

**Attributes**:

| Field | Type | Required | Validation Rules | Purpose |
|-------|------|----------|------------------|---------|
| `id` | `string` | Yes | Unique, lowercase-hyphenated | Existing: Internal identifier |
| `title` | `string` | Yes | 1-100 characters, non-empty | Display name of project |
| `description` | `string` | Yes | 10-1000 characters | Full project description |
| `status` | `ProjectStatus` | Yes | One of: 'completed', 'in-progress', 'to-do' | **NEW**: Current project state (FR-001, FR-002) |
| `technologies` | `string[]` | Yes | Min 1 item, each 1-50 chars | Tech stack used in project |
| `category` | `ProjectCategory \| undefined` | No | Valid category enum or undefined | Optional categorization |
| `context` | `string \| undefined` | No | Max 100 characters | Business domain context |
| `image` | `string \| undefined` | No | Valid URL or relative path | Primary project image |
| `blurDataURL` | `string \| undefined` | No | Base64 data URL | Image placeholder for loading |
| `liveUrl` | `string \| undefined` | No | Valid HTTP(S) URL | Live demo/deployment link |
| `repoUrl` | `string \| undefined` | No | Valid HTTP(S) URL | Source code repository link |
| `images` | `string[] \| undefined` | No | Array of valid URLs/paths | **NEW**: Additional screenshots for gallery |
| `order` | `number` | Yes | Integer ≥ 1 | Display priority (lower = higher priority) |
| `featured` | `boolean \| undefined` | No | True if in carousel | Whether to show in featured carousel |
| `slug` | `string` | **Computed** | Lowercase-hyphenated, unique | **NEW**: URL-safe identifier derived from title (FR-005, FR-006) |
| `createdAt` | `Date \| undefined` | No | Valid ISO date string | **NEW**: Optional creation timestamp |
| `updatedAt` | `Date \| undefined` | No | Valid ISO date string | **NEW**: Optional last update timestamp |

**Computed Fields**:
- `slug`: Generated from `title` using slug generation algorithm (see research.md)
- Should not be stored in data file, computed at runtime for consistency

**Relationships**:
- **One-to-Many** with Technology (conceptual - technologies are stored as strings)
- **Many-to-One** with ProjectCategory (conceptual - category is enum value)

**State Transitions** (for `status` field):

```
┌─────────┐
│  to-do  │────────────────────────────┐
└─────────┘                            │
     │                                 │
     │ Development starts              │ Project cancelled/postponed
     ▼                                 ▼
┌─────────────┐                   ┌─────────┐
│ in-progress │───────────────────│  to-do  │
└─────────────┘                   └─────────┘
     │                                 ▲
     │ Development completes           │
     ▼                                 │
┌───────────┐                          │
│ completed │──────────────────────────┘
└───────────┘    Reopened for updates
```

**Valid Transitions**:
- `to-do` → `in-progress`: Development begins
- `in-progress` → `completed`: Development finishes, deployed
- `completed` → `in-progress`: Reopened for new features/fixes
- `in-progress` → `to-do`: Postponed or cancelled
- `completed` → `to-do`: Archived/deprecated (rare)

**Validation Rules**:

1. **Title Uniqueness**: Each project MUST have a unique title (enforced by slug uniqueness)
2. **Slug Uniqueness**: Each project MUST generate a unique slug (validated at app startup)
3. **Technology Array**: MUST contain at least 1 technology (non-empty)
4. **URL Validation**: `liveUrl` and `repoUrl` MUST be valid HTTP(S) URLs if provided
5. **Order Consistency**: No two projects should have the same `order` value (best practice, not strict requirement)
6. **Status Required**: All projects MUST have a status (no null/undefined allowed)

**Business Rules**:

1. **Featured Projects**: Projects with `featured: true` appear in carousel and gallery
2. **Order Priority**: Lower `order` values display first in gallery
3. **Default Status**: New projects should default to `to-do` status
4. **Link Availability**: At least one of `liveUrl` or `repoUrl` SHOULD be provided for completed projects
5. **Description Length**: Descriptions should be detailed enough for standalone detail page (recommended 100-500 chars)

---

### 2. ProjectStatus (New Enum)

**Description**: Enumeration representing the three possible states of a project's development lifecycle.

**Values**:

| Value | Display Label | Description | Usage |
|-------|--------------|-------------|-------|
| `'completed'` | "Completed" | Project is finished, deployed, and publicly accessible | 🟢 Green badge (Nord 14) |
| `'in-progress'` | "In Progress" | Project is actively being developed | 🟡 Yellow badge (Nord 13) |
| `'to-do'` | "To-Do" | Project is planned but development has not started | 🔵 Blue badge (Nord 9) |

**TypeScript Definition**:
```typescript
export type ProjectStatus = 'completed' | 'in-progress' | 'to-do';
```

**Display Rules**:
- Labels are human-readable and title-cased
- Badges use distinct Nord colors for visual differentiation
- Icons accompany labels for accessibility (CheckCircle, PlayCircle, Circle)

**Validation**:
- MUST be one of the three literal string values (enforced by TypeScript)
- No null or undefined values allowed

---

### 3. URL Slug (Computed Property)

**Description**: URL-safe string derived from project title used for routing to project detail pages. Not stored directly, computed on-demand.

**Generation Algorithm** (from research.md):
1. Convert title to lowercase
2. Remove special characters (keep alphanumeric, spaces, hyphens)
3. Trim leading/trailing whitespace
4. Replace spaces with hyphens
5. Collapse multiple consecutive hyphens to single hyphen

**Examples**:

| Title | Slug |
|-------|------|
| "E-Commerce Platform" | `e-commerce-platform` |
| "Task Management App" | `task-management-app` |
| "Weather Dashboard" | `weather-dashboard` |
| "API Documentation Tool" | `api-documentation-tool` |
| "Real-Time Chat Application" | `real-time-chat-application` |

**Constraints**:
- MUST be unique across all projects
- MUST be URL-safe (no encoding required)
- MUST be deterministic (same input → same output)
- SHOULD be human-readable
- Maximum length: 100 characters (practical limit)

**Edge Cases**:
- Titles with only special characters → fallback to project ID
- Duplicate slugs → throw error during validation (fail-fast in development)
- Empty slugs after sanitization → use project ID as fallback

---

## Data Structure Examples

### Example 1: Enhanced Project with Status

```typescript
{
  id: 'ecommerce-platform',
  title: 'E-Commerce Platform',
  description: 'A modern e-commerce solution built with Next.js and Stripe. Features include product catalog, shopping cart, and secure checkout with real-time inventory management.',
  status: 'completed', // NEW
  technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
  context: 'E-commerce',
  order: 1,
  featured: true,
  liveUrl: 'https://example-shop.com', // Optional
  repoUrl: 'https://github.com/user/ecommerce', // Optional
  images: [ // NEW - Optional
    '/projects/ecommerce/screenshot-1.png',
    '/projects/ecommerce/screenshot-2.png'
  ],
  createdAt: '2024-01-15', // NEW - Optional
  updatedAt: '2024-06-20', // NEW - Optional
  // slug: 'ecommerce-platform' (computed, not stored)
}
```

### Example 2: In-Progress Project

```typescript
{
  id: 'task-management-app',
  title: 'Task Management App',
  description: 'Collaborative task management application with real-time updates.',
  status: 'in-progress', // Currently being developed
  technologies: ['React', 'TypeScript', 'Firebase', 'Material UI'],
  context: 'Productivity',
  order: 2,
  featured: true,
  // No liveUrl yet (not deployed)
  repoUrl: 'https://github.com/user/task-app',
  // slug: 'task-management-app' (computed)
}
```

### Example 3: Planned Project

```typescript
{
  id: 'future-project',
  title: 'AI Content Generator',
  description: 'AI-powered tool for generating blog posts and social media content.',
  status: 'to-do', // Planned but not started
  technologies: ['Python', 'OpenAI API', 'FastAPI'],
  context: 'AI/ML',
  order: 10,
  featured: false,
  // No URLs (not started)
  // slug: 'ai-content-generator' (computed)
}
```

---

## Migration Strategy

### Current Data → Enhanced Data

**Changes Required**:
1. Add `status` field to all existing projects in `src/data/projects.ts`
2. Optionally add `images`, `createdAt`, `updatedAt` fields
3. Update `Project` type in `src/lib/types.ts` to include new fields
4. Implement slug generation utility in `src/lib/projects.ts`
5. Add slug uniqueness validation (run at app startup)

**Example Migration**:

```typescript
// Before
{
  id: 'weather-dashboard',
  title: 'Weather Dashboard',
  description: '...',
  technologies: ['React', 'TypeScript'],
  order: 3,
}

// After
{
  id: 'weather-dashboard',
  title: 'Weather Dashboard',
  description: '...',
  status: 'completed', // ← ADD THIS
  technologies: ['React', 'TypeScript'],
  order: 3,
  liveUrl: 'https://weather.example.com', // ← OPTIONALLY ADD
  repoUrl: 'https://github.com/user/weather', // ← OPTIONALLY ADD
}
```

**Default Status Assignment**:
- Projects with `liveUrl` → `'completed'`
- Projects with active development → `'in-progress'` (manual assignment)
- All others → `'to-do'`

---

## Constraints & Invariants

### Data Integrity Constraints

1. **Referential Integrity**:
   - All `technologies` values should ideally exist in a master technology list (soft constraint)
   - All `category` values must be valid `ProjectCategory` enum values

2. **Uniqueness Constraints**:
   - `id` MUST be unique (primary key)
   - `title` SHOULD be unique (enforced via slug uniqueness)
   - `slug` (computed) MUST be unique

3. **Format Constraints**:
   - `liveUrl` and `repoUrl` MUST match URL pattern `^https?://`
   - `technologies` array MUST have length ≥ 1
   - `order` MUST be positive integer

4. **Logical Constraints**:
   - Completed projects (`status: 'completed'`) SHOULD have at least one URL (liveUrl or repoUrl)
   - Featured projects (`featured: true`) SHOULD have an `image` for optimal display

### Runtime Validations

**At Application Startup**:
```typescript
// Validate slug uniqueness
validateSlugUniqueness(projects);

// Validate no duplicate IDs
validateUniqueIds(projects);

// Warn if completed projects missing URLs
warnMissingUrls(projects.filter(p => p.status === 'completed'));
```

**At Build Time** (Next.js):
```typescript
// generateStaticParams validates all slugs can be generated
export async function generateStaticParams() {
  return projects.map(p => ({
    slug: generateSlug(p.title)
  }));
}
```

---

## Summary

### New Entities
- **ProjectStatus**: Enum type with 3 values (completed, in-progress, to-do)
- **URL Slug**: Computed string derived from project title

### Modified Entities
- **Project**: Added `status` (required), `images`, `createdAt`, `updatedAt` (optional)

### Key Validations
- Status is required and must be one of 3 valid values
- Slugs must be unique across all projects
- URLs must be valid HTTP(S) format if provided

### State Management
- All data is static (no database, no runtime mutations)
- Status transitions are manual (via code updates to `projects.ts`)
- Slug generation is deterministic and computed at runtime
