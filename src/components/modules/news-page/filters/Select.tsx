// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use, useEffect, useRef } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { SelectIDsT } from './local.js';
import { NewsContext } from '../NewsPage.context';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
  selectId: SelectIDsT;
  closeHandler: () => void;
}

// ⚙️ Functional component
const Select: React.FC<PropsT> = ({ selectId, closeHandler, children }) => {
  const { params } = use(NewsContext);

  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeHandler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeHandler]);

  return (
    <div
      ref={selectRef}
      className={clsx(
        'relative col-span-3 min-h-full',
        params.searchString &&
          selectId !== 'sources' &&
          'pointer-events-none opacity-30',
      )}
    >
      {children}
    </div>
  );
};
export default Select;
