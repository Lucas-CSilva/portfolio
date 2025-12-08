'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useProjectFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTech = searchParams.get('tech');

    const setFilter = useCallback(
        (techSlug: string | null) => {
            const params = new URLSearchParams(searchParams.toString());

            if (techSlug === null || techSlug === activeTech) {
                // Clear filter if clicking active filter or explicitly clearing
                params.delete('tech');
            } else {
                // Set new filter
                params.set('tech', techSlug);
            }

            const query = params.toString();
            router.replace(query ? `/?${query}` : '/', { scroll: false });
        },
        [router, searchParams, activeTech]
    );

    return {
        activeTech,
        setFilter,
    };
}
