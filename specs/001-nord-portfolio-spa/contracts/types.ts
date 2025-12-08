/**
 * Type Contracts: Nord Portfolio SPA
 * 
 * Feature: 001-nord-portfolio-spa
 * Date: 2025-12-08
 * Purpose: TypeScript interfaces and type definitions for portfolio data structures
 */

// ============================================================================
// Core Entities
// ============================================================================

/**
 * Project entity representing a portfolio work item
 */
export interface Project {
    /** Unique identifier (kebab-case, e.g., "project-1") */
    id: string;

    /** Project display name (1-60 characters) */
    title: string;

    /** Brief project description (50-200 characters, 2-3 sentences) */
    description: string;

    /** Array of technology names (2-6 items) */
    technologies: string[];

    /** Optional image filename (e.g., "project-1.webp") */
    image?: string;

    /** Optional blur placeholder data URI for image */
    blurDataURL?: string;

    /** Optional live deployment URL */
    liveUrl?: string;

    /** Optional repository URL (GitHub, GitLab, etc.) */
    repoUrl?: string;

    /** Display priority (lower = higher priority) */
    order: number;

    /** Featured project flag (optional, default: false) */
    featured?: boolean;
}

/**
 * Technology category derived from project tags
 */
export interface Technology {
    /** Technology display name (matches project tag exactly) */
    name: string;

    /** Number of projects using this technology */
    count: number;

    /** URL-safe slug (lowercase, alphanumeric with hyphens) */
    slug: string;
}

/**
 * Theme preference state
 */
export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemePreference {
    /** Active theme selection */
    theme: ThemeType;

    /** localStorage key for persistence */
    storageKey: string;

    /** Optional timestamp of last update (Unix timestamp in ms) */
    timestamp?: number;
}

/**
 * Filter state for technology filtering
 */
export interface FilterState {
    /** Currently active technology slug, or null for no filter */
    activeTechnology: string | null;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Props for Hero component
 */
export interface HeroProps {
    /** Portfolio owner's name */
    name: string;

    /** Professional title/role */
    title: string;

    /** Brief introduction (2-4 sentences) */
    introduction: string;
}

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps extends Project {
    /** Optional index for lazy loading logic */
    index?: number;
}

/**
 * Props for ProjectGallery component
 */
export interface ProjectGalleryProps {
    /** Array of projects to display */
    projects: Project[];

    /** Optional active filter slug */
    activeFilter?: string | null;
}

/**
 * Props for FilterControls component
 */
export interface FilterControlsProps {
    /** Array of available technologies with counts */
    technologies: Technology[];

    /** Currently active technology slug */
    activeTech?: string | null;
}

/**
 * Props for MobileCarousel component
 */
export interface MobileCarouselProps {
    /** Array of projects to display in carousel */
    projects: Project[];
}

/**
 * Props for ThemeToggle component
 */
export interface ThemeToggleProps {
    /** Optional custom aria-label */
    ariaLabel?: string;
}

/**
 * Props for TechBadge component
 */
export interface TechBadgeProps {
    /** Technology name to display */
    technology: string;

    /** Whether this badge is active/selected */
    active?: boolean;

    /** Optional click handler */
    onClick?: () => void;
}

/**
 * Props for EmptyState component
 */
export interface EmptyStateProps {
    /** Message to display */
    message: string;

    /** Optional call-to-action button text */
    actionText?: string;

    /** Optional action handler */
    onAction?: () => void;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Page component searchParams prop type
 */
export interface PageSearchParams {
    /** Technology filter slug */
    tech?: string;
}

/**
 * Embla Carousel options type
 */
export interface EmblaOptions {
    /** Slide alignment */
    align?: 'start' | 'center' | 'end';

    /** Scroll containment strategy */
    containScroll?: 'trimSnaps' | 'keepSnaps' | false;

    /** Enable free-form dragging */
    dragFree?: boolean;

    /** Enable infinite loop */
    loop?: boolean;

    /** Slides to scroll at a time */
    slidesToScroll?: number;
}

/**
 * Technology count type for aggregation
 */
export interface TechnologyCount {
    /** Technology name */
    technology: string;

    /** Number of projects */
    count: number;
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Project validation schema
 */
export interface ProjectValidation {
    /** ID must be kebab-case alphanumeric */
    id: RegExp;

    /** Title length constraints */
    title: {
        minLength: number;
        maxLength: number;
    };

    /** Description length constraints */
    description: {
        minLength: number;
        maxLength: number;
    };

    /** Technologies array constraints */
    technologies: {
        minItems: number;
        maxItems: number;
        itemLength: {
            min: number;
            max: number;
        };
    };

    /** Order must be non-negative integer */
    order: {
        min: number;
        type: 'integer';
    };
}

/**
 * Validation schema constant
 */
export const PROJECT_VALIDATION: ProjectValidation = {
    id: /^[a-z0-9-]+$/,
    title: {
        minLength: 1,
        maxLength: 60,
    },
    description: {
        minLength: 50,
        maxLength: 200,
    },
    technologies: {
        minItems: 2,
        maxItems: 6,
        itemLength: {
            min: 2,
            max: 20,
        },
    },
    order: {
        min: 0,
        type: 'integer',
    },
};

// ============================================================================
// Utility Functions (Type Guards)
// ============================================================================

/**
 * Type guard to check if a value is a valid Project
 */
export function isProject(value: unknown): value is Project {
    if (typeof value !== 'object' || value === null) return false;

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.id === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.description === 'string' &&
        Array.isArray(obj.technologies) &&
        obj.technologies.every(t => typeof t === 'string') &&
        typeof obj.order === 'number'
    );
}

/**
 * Type guard to check if a value is a valid Technology
 */
export function isTechnology(value: unknown): value is Technology {
    if (typeof value !== 'object' || value === null) return false;

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.name === 'string' &&
        typeof obj.count === 'number' &&
        typeof obj.slug === 'string'
    );
}

/**
 * Type guard to check if a value is a valid ThemeType
 */
export function isThemeType(value: unknown): value is ThemeType {
    return value === 'light' || value === 'dark' || value === 'system';
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Responsive breakpoint (matches Tailwind 'md' breakpoint)
 */
export const MOBILE_BREAKPOINT = 768; // pixels

/**
 * Default theme storage key
 */
export const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * URL query parameter name for filter
 */
export const FILTER_PARAM_NAME = 'tech';

/**
 * Performance targets (from spec requirements)
 */
export const PERFORMANCE_TARGETS = {
    /** Largest Contentful Paint target (ms) */
    LCP: 2500,

    /** First Input Delay target (ms) */
    FID: 100,

    /** Cumulative Layout Shift target */
    CLS: 0.1,

    /** Time to Interactive target (ms) */
    TTI: 3500,

    /** Target JavaScript bundle size (bytes, gzipped) */
    BUNDLE_SIZE: 100_000,
} as const;

/**
 * Accessibility targets (WCAG AA compliance)
 */
export const A11Y_TARGETS = {
    /** Minimum contrast ratio for normal text */
    TEXT_CONTRAST: 4.5,

    /** Minimum contrast ratio for large text */
    LARGE_TEXT_CONTRAST: 3.0,

    /** Minimum contrast ratio for UI components */
    UI_CONTRAST: 3.0,

    /** Target Lighthouse accessibility score */
    LIGHTHOUSE_SCORE: 95,
} as const;
