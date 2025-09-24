// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { usePathname } from 'next/navigation';

// 📦 Internal imports
import { headerLessRoutes } from '../local';
import HeaderUi from './Header.ui';

// ⚙️ Functional component
export default function HeaderFn() {
  const pathname = usePathname();
  if (headerLessRoutes.includes(pathname)) return null;

  return <HeaderUi />;
}
