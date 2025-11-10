import { useEffect, useState } from 'react';

export const useRotatingIndex = <T extends number>(
  min: T,
  max: T,
  intervalMs = 10_000,
): T => {
  const [index, setIndex] = useState<T>(min);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev === max ? min : ((prev + 1) as T)));
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs]);

  return index;
};
