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
  subLinks?: string[];
}

// ⚙️ Functional component
export const NavLink: React.FC<PropsT> = (props) => {
  const { href, className, activeClassName, subLinks = [], children } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  const isSubActive =
    !!subLinks.length && subLinks.find((item) => item === pathname);
  const combinedClassName = clsx(
    className,
    (isActive || isSubActive) && activeClassName,
  );

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};
