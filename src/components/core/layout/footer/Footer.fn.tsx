// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { usePathname } from 'next/navigation';

// 📦 Internal imports
import { footerLessRoutes } from '../local';
import FooterUi from './Footer.ui';

// 🧾 Local types

// ⚙️ Functional component
export default function FooterFn() {
  const pathname = usePathname();
  if (footerLessRoutes.includes(pathname)) return null;

  return <FooterUi isHomePage={pathname === '/'} />;
}
