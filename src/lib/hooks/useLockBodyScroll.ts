import { useEffect } from 'react';

export const useLockBodyScroll = (lock: boolean = true): void => {
  useEffect(() => {
    if (!lock) return;

    // 1. Getting page original overflow & scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.scrollWidth;
    const originalStyle: string = window.getComputedStyle(
      document.documentElement,
    ).overflow;

    // 2. Disable page overflow & set the scrollbar width
    //    as page paddingRight to prevent page jumping
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    // 3. Return the cleanup function that resets the page overflow
    return () => {
      document.documentElement.style.overflow = originalStyle || 'auto';
      document.documentElement.style.paddingRight = '0';
    };
  }, [lock]);
};
