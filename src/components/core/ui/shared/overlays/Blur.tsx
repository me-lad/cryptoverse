// 📌 Directives
'use client';

import { useLockBodyScroll } from '@/lib/hooks/useLockBodyScroll';
// 📦 Third-Party imports
import React from 'react';

// 🧾 Local types
interface BlurWrapperPropsT extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

// ⚙️ Functional component
export const Blur = () => {
  return (
    <div className="bg-background/25 fixed top-0 left-0 z-[49] h-screen w-screen backdrop-blur-xs"></div>
  );
};

export const BlurWrapper: React.FC<BlurWrapperPropsT> = ({
  children,
  className,
  ...rest
}) => {
  useLockBodyScroll();

  return (
    <div
      className={`bg-background/75 fixed top-0 left-0 z-50 h-screen w-screen backdrop-blur-xs ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
