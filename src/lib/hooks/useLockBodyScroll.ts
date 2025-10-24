import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (): void => {
  useLayoutEffect(() => {
    // 1. Getting page original overflow & scrollbar width
    const scrollbarWidth = innerWidth - document.documentElement.scrollWidth;
    const originalStyle: string = window.getComputedStyle(
      document.documentElement,
    ).overflow;

    // 2. Disable page overflow & set the scrollbar width
    //    as page paddingRight to prevent page jumping
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    // 3. Return the cleanup function that reset the page overflow by
    //    parent component unmount
    return () => {
      document.documentElement.style.overflow = originalStyle || 'auto';
      document.documentElement.style.paddingRight = '0';
    };
  }, []);
};
