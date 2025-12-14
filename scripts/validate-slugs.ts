#!/usr/bin/env tsx
/**
 * Validates slug uniqueness across all projects
 * Run: npx tsx scripts/validate-slugs.ts
 */

import { projects } from '../src/data/projects';
import { generateSlug } from '../src/lib/projects';

console.log('🔍 Validating project slug uniqueness...\n');

const slugMap = new Map<string, string[]>();

projects.forEach((project) => {
    const slug = generateSlug(project.title);
    const existing = slugMap.get(slug) || [];
    existing.push(project.title);
    slugMap.set(slug, existing);
});

let hasCollisions = false;

slugMap.forEach((titles, slug) => {
    if (titles.length > 1) {
        hasCollisions = true;
        console.error(`❌ Slug collision detected: "${slug}"`);
        console.error(`   Projects: ${titles.join(', ')}\n`);
    } else {
        console.log(`✅ ${slug} → "${titles[0]}"`);
    }
});

if (hasCollisions) {
    console.error('\n❌ Validation failed: Duplicate slugs detected');
    process.exit(1);
} else {
    console.log('\n✅ All project slugs are unique!');
    console.log(`   Total projects: ${projects.length}`);
    process.exit(0);
}
