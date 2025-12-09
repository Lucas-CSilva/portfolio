'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import type { FilterState } from '@/lib/types';

export function useProjectFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Get current filters from URL
    const search = searchParams.get('search') ?? '';
    const activeTech = searchParams.get('tech');
    const activeCategory = searchParams.get('category');

    // Local state for instant search feedback
    const [localSearch, setLocalSearch] = useState(search);

    const updateFilters = useCallback(
        (updates: Partial<FilterState>) => {
            const params = new URLSearchParams(searchParams.toString());

            // Handle search
            if ('search' in updates) {
                const searchValue = updates.search?.trim();
                if (searchValue) {
                    params.set('search', searchValue);
                } else {
                    params.delete('search');
                }
            }

            // Handle technology filter
            if ('technology' in updates) {
                const techValue = updates.technology;
                if (techValue === null || techValue === activeTech) {
                    params.delete('tech');
                } else if (techValue) {
                    params.set('tech', techValue);
                }
            }

            // Handle category filter
            if ('category' in updates) {
                const categoryValue = updates.category;
                if (categoryValue === null || categoryValue === activeCategory) {
                    params.delete('category');
                } else if (categoryValue) {
                    params.set('category', categoryValue);
                }
            }

            const query = params.toString();
            startTransition(() => {
                router.replace(query ? `/?${query}` : '/', { scroll: false });
            });
        },
        [router, searchParams, activeTech, activeCategory]
    );

    const setSearch = useCallback(
        (value: string) => {
            setLocalSearch(value);
            updateFilters({ search: value });
        },
        [updateFilters]
    );

    const setTechFilter = useCallback(
        (techSlug: string | null) => {
            updateFilters({ technology: techSlug });
        },
        [updateFilters]
    );

    const setCategoryFilter = useCallback(
        (categorySlug: string | null) => {
            updateFilters({ category: categorySlug });
        },
        [updateFilters]
    );

    const clearAllFilters = useCallback(() => {
        setLocalSearch('');
        startTransition(() => {
            router.replace('/', { scroll: false });
        });
    }, [router]);

    return {
        search: localSearch,
        activeTech,
        activeCategory,
        isPending,
        setSearch,
        setTechFilter,
        setCategoryFilter,
        clearAllFilters,
        hasActiveFilters: !!(localSearch || activeTech || activeCategory),
    };
}
