import { useEffect, useState } from 'react';

export const useMediaQuery = (
  queryType: 'max-width' | 'min-width',
  breakPoint: number,
) => {
  const [isPassed, setIsPassed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(${queryType}: ${breakPoint}px)`);
    const onChange = () => {
      setIsPassed(mql.matches);
    };
    mql.addEventListener('change', onChange);
    setIsPassed(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [queryType, breakPoint]);

  return isPassed;
};
