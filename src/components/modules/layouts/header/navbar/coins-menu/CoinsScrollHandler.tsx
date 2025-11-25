// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { RefObject, useEffect, useCallback, use } from 'react';
import { Spinner } from '~core/ui/shadcn/spinner';

// 📦 Internal imports
import { HeaderNavbarCoinsContext } from '../Navbar.context';
import { flexCenter } from '~styles/tw-custom';
import { useHasMounted } from '~hooks/useHasMounted';

// 🧾 Local types
interface PropsT {
  container: RefObject<HTMLDivElement | null>;
}

const CoinsScrollHandler: React.FC<PropsT> = ({ container }) => {
  const { params, flags, actions } = use(HeaderNavbarCoinsContext);
  const hasMounted = useHasMounted();

  const checkScrollPosition = useCallback(
    (target: HTMLDivElement) => {
      const { scrollHeight, clientHeight, scrollTop } = target;
      const distanceToBottom = scrollHeight - clientHeight - scrollTop;
      const nearBottom = distanceToBottom < 200;

      if (nearBottom && !flags.isLoading && params.page < 30) {
        actions?.setParams('slicePoint', params.slicePoint + 25);
      }
    },
    [flags.isLoading, params.slicePoint, params.page, actions],
  );

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const handleScroll = () => {
      actions?.setParams('lastScrollPosition', el.scrollTop);
      checkScrollPosition(el);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [container, checkScrollPosition]);

  useEffect(() => {
    const el = container.current;
    if (!el || hasMounted) return;

    if (params?.lastScrollPosition) {
      requestAnimationFrame(() => {
        el.scrollTo({
          top: params.lastScrollPosition - el.clientHeight * 0.25,
        });
      });
    }
  }, [params?.lastScrollPosition]);

  return flags.isLoading ? (
    <div className={`${flexCenter} mt-[5.5rem]`}>
      <Spinner variant="ellipsis" size={50} />
    </div>
  ) : null;
};

export default CoinsScrollHandler;
