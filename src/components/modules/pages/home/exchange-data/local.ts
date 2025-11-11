import { useEffect, useState } from 'react';
import { flexCenter } from '~styles/tw-custom';
import clsx from 'clsx';

export const useRotatingIndex = <T extends number>(
  min: T,
  max: T,
  intervalMs = 10_000,
  delay = 0,
): T => {
  const [index, setIndex] = useState<T>(min);

  useEffect(() => {
    setTimeout(() => {}, delay);
    const id = setInterval(() => {
      setIndex((prev) => (prev === max ? min : ((prev + 1) as T)));
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs]);

  return index;
};

export const propertiesParentClassName =
  'absolute inset-0 flex items-center justify-between px-5 text-2xl font-semibold transition-transform duration-700 min-[33.75em]:text-base md:text-lg lg:px-0 lg:text-xl xl:text-2xl';

export const lastChildClassName = `w-1/3 min-[52em]:w-1/4 ${flexCenter} hidden gap-2 min-[52em]:flex`;

export const otherChildrenClassNameGenerator = (
  order: number,
  targetState: number,
) => {
  return clsx(
    'min-[33.75em]:flex min-[33.75em]:w-1/3 min-[52em]:w-1/4 gap-2 justify-center items-center',
    order !== targetState ? 'max-[33.7495em]:hidden ' : 'flex w-full',
  );
};
