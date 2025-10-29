'use client';

import React, { RefObject, useEffect, useCallback, use, useRef } from 'react';
import { Spinner } from '~core/ui/shadcn/spinner';
import { HeaderNavbarCoinsContext } from '../Navbar.context';
import { flexCenter } from '~styles/tw-custom';

interface PropsT {
  container: RefObject<HTMLDivElement | null>;
}

const CoinsScrollHandler: React.FC<PropsT> = ({ container }) => {
  const { actions, params } = use(HeaderNavbarCoinsContext);
  const hasMounted = useRef(false);

  const checkScrollPosition = useCallback(
    (target: HTMLDivElement) => {
      const { scrollHeight, clientHeight, scrollTop } = target;
      const nearBottom =
        Math.abs(scrollHeight - clientHeight - scrollTop) < 200;

      if (nearBottom && !params?.isLoading) {
        actions?.setSlicePoint((prev) => prev + 25);
      }
    },
    [params?.isLoading, actions],
  );

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      actions?.setLastScrollPosition(el.scrollTop);
      checkScrollPosition(target);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [container, checkScrollPosition]);

  useEffect(() => {
    const el = container.current;
    if (!el || !params?.lastScrollPosition || hasMounted.current) return;

    if (!hasMounted.current) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: params.lastScrollPosition });
      });
      hasMounted.current = true;
    }
  }, [params?.lastScrollPosition]);

  return params?.isLoading ? (
    <div className={`${flexCenter} mt-[5.5rem]`}>
      <Spinner variant="ellipsis" size={50} />
    </div>
  ) : null;
};

export default CoinsScrollHandler;
