import { useLayoutEffect, useRef } from 'react';

function useIsMounted(): boolean {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}

export { useIsMounted };
