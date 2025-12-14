/**
 * Type Contracts: Project Detail Pages with Enhanced Status Display
 * 
 * Feature: 002-project-detail-pages
 * Date: December 13, 2025
 * 
 * This file defines TypeScript type contracts for the enhanced project data model.
 * These types will be integrated into src/lib/types.ts during implementation.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Project status enumeration representing development lifecycle states
 * 
 * @remarks
 * - 'completed': Project is finished, deployed, and publicly accessible
 * - 'in-progress': Project is actively being developed
 * - 'to-do': Project is planned but development has not started
 * 
 * Visual Mapping (Nord Theme):
 * - completed → Nord 14 (Green)
 * - in-progress → Nord 13 (Yellow)  
 * - to-do → Nord 9 (Blue)
 */
export type ProjectStatus = 'completed' | 'in-progress' | 'to-do';

/**
 * Enhanced Project interface with status and detail page support
 * 
 * @remarks
 * This extends the existing Project type with new fields required for
 * status display and project detail pages. Existing fields are preserved.
 * 
 * Changes from existing type:
 * - Added: status (required)
 * - Added: images (optional array for gallery)
 * - Added: createdAt (optional timestamp)
 * - Added: updatedAt (optional timestamp)
 * 
 * Computed fields (not stored):
 * - slug: Generated from title via generateSlug() utility
 */
export interface Project {
    // Existing fields (unchanged)
    id: string;
    title: string;
    description: string;
    technologies: string[];
    category?: ProjectCategory;
    context?: string;
    image?: string;
    blurDataURL?: string;
    liveUrl?: string;
    repoUrl?: string;
    order: number;
    featured?: boolean;

    // New fields for this feature
    /**
     * Current development status of the project
     * @required Must be one of: 'completed', 'in-progress', 'to-do'
     */
    status: ProjectStatus;

    /**
     * Additional project screenshots for detail page gallery
     * @optional Array of image URLs or relative paths
     */
    images?: string[];

    /**
     * Project creation timestamp
     * @optional ISO 8601 date string or Date object
     */
    createdAt?: string | Date;

    /**
     * Last update timestamp
     * @optional ISO 8601 date string or Date object
     */
    updatedAt?: string | Date;
}

/**
 * Project category classification (unchanged from existing type)
 */
export type ProjectCategory =
    | 'web-app'
    | 'cli-tool'
    | 'api'
    | 'library'
    | 'dashboard'
    | 'cms'
    | 'other';

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Props for StatusBadge component
 * 
 * @remarks
 * Used to display project status with Nord-themed color coding
 */
export interface StatusBadgeProps {
    /**
     * Project status to display
     */
    status: ProjectStatus;

    /**
     * Badge size variant
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * Optional CSS classes for customization
     */
    className?: string;

    /**
     * Whether to show status icon alongside label
     * @default true
     */
    showIcon?: boolean;
}

/**
 * Props for ProjectCard component (enhanced)
 * 
 * @remarks
 * Adds onClick handler for navigation to detail page
 */
export interface ProjectCardProps {
    /**
     * Project data to display
     */
    project: Project;

    /**
     * Optional click handler for navigation
     * If provided, card becomes clickable and navigates to detail page
     */
    onClick?: (project: Project) => void;

    /**
     * Whether card should be clickable
     * @default true
     */
    clickable?: boolean;

    /**
     * Optional CSS classes
     */
    className?: string;
}

/**
 * Props for ProjectDetailView component (new)
 * 
 * @remarks
 * Main component for rendering comprehensive project details
 */
export interface ProjectDetailViewProps {
    /**
     * Full project data including all optional fields
     */
    project: Project;

    /**
     * Whether to show "Back to Projects" navigation
     * @default true
     */
    showBackButton?: boolean;

    /**
     * Optional related projects to display
     */
    relatedProjects?: Project[];
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Project with required slug field (computed at runtime)
 * 
 * @remarks
 * Used in contexts where slug is needed (e.g., routing, navigation)
 */
export interface ProjectWithSlug extends Project {
    slug: string;
}

/**
 * Minimal project data for list views (gallery, carousel)
 * 
 * @remarks
 * Optimized subset of Project for efficient rendering in lists
 */
export interface ProjectListItem {
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
    technologies: string[];
    image?: string;
    featured?: boolean;
    slug: string;
}

/**
 * Status badge configuration (internal)
 * 
 * @remarks
 * Maps status values to visual properties
 */
export interface StatusBadgeConfig {
    color: string; // Tailwind class (e.g., 'bg-nord-14')
    textColor: string; // Tailwind class (e.g., 'text-nord-0')
    icon: React.ComponentType<any>; // MUI icon component
    label: string; // Display label (e.g., 'Completed')
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Result of slug uniqueness validation
 */
export interface SlugValidationResult {
    /**
     * Whether all slugs are unique
     */
    isValid: boolean;

    /**
     * List of duplicate slugs found (if any)
     */
    duplicates: string[];

    /**
     * Projects with duplicate slugs
     */
    conflicts: Project[];
}

/**
 * Result of project data validation
 */
export interface ProjectValidationResult {
    /**
     * Whether project data is valid
     */
    isValid: boolean;

    /**
     * Validation errors (if any)
     */
    errors: string[];

    /**
     * Non-critical warnings
     */
    warnings: string[];
}

// ============================================================================
// Route Parameter Types (Next.js)
// ============================================================================

/**
 * Dynamic route parameters for project detail page
 * 
 * @remarks
 * Used in app/projects/[slug]/page.tsx
 */
export interface ProjectPageParams {
    slug: string;
}

/**
 * Props for project detail page component
 * 
 * @remarks
 * Next.js App Router passes params as props
 */
export interface ProjectPageProps {
    params: ProjectPageParams;
    searchParams?: Record<string, string | string[] | undefined>;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Status display configuration
 */
export const STATUS_CONFIG: Record<ProjectStatus, StatusBadgeConfig> = {
    completed: {
        color: 'bg-nord-14',
        textColor: 'text-nord-0',
        icon: null as any, // Will be imported from MUI in implementation
        label: 'Completed',
    },
    'in-progress': {
        color: 'bg-nord-13',
        textColor: 'text-nord-0',
        icon: null as any,
        label: 'In Progress',
    },
    'to-do': {
        color: 'bg-nord-9',
        textColor: 'text-nord-0',
        icon: null as any,
        label: 'To-Do',
    },
};

/**
 * Status labels for display
 */
export const STATUS_LABELS: Record<ProjectStatus, string> = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    'to-do': 'To-Do',
};

/**
 * Valid status values for validation
 */
export const VALID_STATUSES: readonly ProjectStatus[] = [
    'completed',
    'in-progress',
    'to-do',
] as const;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if a value is a valid ProjectStatus
 */
export function isProjectStatus(value: any): value is ProjectStatus {
    return VALID_STATUSES.includes(value as ProjectStatus);
}

/**
 * Type guard to check if a project has required fields for detail page
 */
export function isDetailPageReady(project: Project): boolean {
    return (
        Boolean(project.title) &&
        Boolean(project.description) &&
        isProjectStatus(project.status) &&
        project.technologies.length > 0
    );
}

/**
 * Type guard to check if a project has URLs (live or repo)
 */
export function hasProjectLinks(project: Project): boolean {
    return Boolean(project.liveUrl || project.repoUrl);
}
