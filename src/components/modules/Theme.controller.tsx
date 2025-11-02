// 📌 Directives
'use client';

// 📦 Third-Party imports
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// ⚙️ Functional component
const ThemeController = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/dashboard') && document?.documentElement) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
  }, [pathname]);

  return <div>ThemeController component</div>;
};
export default ThemeController;
