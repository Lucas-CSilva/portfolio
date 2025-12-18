/**
 * String manipulation utilities
 */

/**
 * Convert a string to a URL-friendly slug
 * @example slugify("Next.js Framework") => "next-js-framework"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
