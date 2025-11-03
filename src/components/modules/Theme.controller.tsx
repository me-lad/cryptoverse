// 📌 Directives
'use client';

// 📦 Third-Party imports
import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';

// ⚙️ Functional component
const ThemeController = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useLayoutEffect(() => {
    if (document?.documentElement) {
      if (!pathname.startsWith('/dashboard')) {
        setTheme('dark');
      } else {
        setTheme('system');
      }
    }
  }, [pathname]);

  return null;
};
export default ThemeController;
