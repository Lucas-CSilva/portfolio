import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCarouselOptions {
    itemCount: number;
    autoplayDelay?: number;
    animationDuration?: number;
}

export interface UseCarouselReturn {
    currentIndex: number;
    isAnimating: boolean;
    scrollNext: () => void;
    scrollPrev: () => void;
    scrollTo: (index: number) => void;
    getCardPosition: (index: number) => number;
}

export function useCarousel({
    itemCount,
    autoplayDelay = 6000,
    animationDuration = 500,
}: UseCarouselOptions): UseCarouselReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const autoplayTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const startAnimation = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), animationDuration);
    }, [animationDuration]);

    const scrollNext = useCallback(() => {
        if (isAnimating || itemCount === 0) return;
        startAnimation();
        setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, [isAnimating, itemCount, startAnimation]);

    const scrollPrev = useCallback(() => {
        if (isAnimating || itemCount === 0) return;
        startAnimation();
        setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    }, [isAnimating, itemCount, startAnimation]);

    const scrollTo = useCallback(
        (index: number) => {
            if (isAnimating || index === currentIndex || itemCount === 0) return;
            startAnimation();
            setCurrentIndex(index);
        },
        [isAnimating, currentIndex, itemCount, startAnimation]
    );

    const getCardPosition = useCallback(
        (index: number) => {
            if (itemCount === 0) return 0;
            let position = index - currentIndex;

            if (position > itemCount / 2) position -= itemCount;
            if (position < -itemCount / 2) position += itemCount;

            return position;
        },
        [currentIndex, itemCount]
    );

    // Autoplay
    useEffect(() => {
        if (itemCount === 0) return;

        autoplayTimeoutRef.current = setTimeout(() => {
            startAnimation();
            setCurrentIndex((prev) => (prev + 1) % itemCount);
        }, autoplayDelay);

        return () => {
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current);
            }
        };
    }, [currentIndex, itemCount, autoplayDelay, startAnimation]);

    return {
        currentIndex,
        isAnimating,
        scrollNext,
        scrollPrev,
        scrollTo,
        getCardPosition,
    };
}
