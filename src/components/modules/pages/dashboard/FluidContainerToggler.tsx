// 📌 Directives
'use client';

// 📦 Third-Party imports
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

// 📦 Internal imports
import { useIsMounted } from '~hooks/useIsMounted';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  title: string;
}

// ⚙️ Functional component
const FluidContainerToggler: React.FC<PropsT> = ({ title }) => {
  const toggler = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<'condense' | 'expand'>('expand');

  const isMounted = useIsMounted();

  const changeParentExpand = () => {
    if (isMounted && toggler.current && typeof document !== 'undefined') {
      const parent = toggler.current.parentElement?.parentElement;
      if (!parent) return;

      const expandStatus = parent?.dataset.expand;

      if (expandStatus === 'true') {
        parent.dataset.expand = 'false';
        setStatus('condense');
      } else {
        parent.dataset.expand = 'true';
        setStatus('expand');
      }
    }
  };

  return (
    <div>
      {status === 'condense' && (
        <h2 className="text-xl font-semibold">{title}</h2>
      )}
      <div
        ref={toggler}
        className={clsx(
          'bg-background shadow-foreground before:bg-background absolute -top-10 right-5 z-[2] size-7 cursor-pointer rounded-md shadow-2xl before:absolute before:top-full before:z-[1] before:h-4 before:w-0.5',
          flexCenter,
          !isMounted && 'pointer-events-none',
        )}
        onClick={changeParentExpand}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(
            'lucide lucide-chevron-down size-3.5 shrink-0 transition-all duration-300',
            status === 'condense' ? 'rotate-0' : 'rotate-180',
          )}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>
    </div>
  );
};
export default FluidContainerToggler;
