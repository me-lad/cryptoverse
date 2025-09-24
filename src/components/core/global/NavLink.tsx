// 📌 Directives
'use client';

// 📦 Third-Party imports
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

// 🧾 Local types
interface PropsT {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

// ⚙️ Functional component
export const NavLink: React.FC<PropsT> = (props) => {
  const { href, className, activeClassName, children } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  const combinedClassName = clsx(className, isActive && activeClassName);

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};
