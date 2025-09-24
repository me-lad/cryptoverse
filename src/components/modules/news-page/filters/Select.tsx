// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { SelectIDsT } from './local.js';
import { NewsContext } from '../NewsPage.context';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
  selectId: SelectIDsT;
}

// ⚙️ Functional component
const Select: React.FC<PropsT> = ({ selectId, children }) => {
  const { params } = use(NewsContext);

  return (
    <div
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
