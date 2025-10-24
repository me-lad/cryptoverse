// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 📦 Internal imports

// 🧾 Local types
interface PropsT extends React.ComponentProps<'div'> {
  order: 'back' | 'forward' | 'refresh';
  children?: React.ReactNode;
  url?: string;
  delay?: number;
}

// ⚙️ Functional component
const Navigator = (props: PropsT) => {
  const { children, order, url, delay, className, ...rest } = props;
  const router = useRouter();

  const doNavigate = () => {
    if (url) {
      router.push(url);
    } else {
      if (order === 'back') {
        router.back();
      } else if (order === 'forward') {
        router.forward();
      } else {
        router.refresh();
      }
    }
  };

  const navigationHandler = () => {
    if (delay) {
      setTimeout(() => doNavigate(), delay);
    } else {
      doNavigate();
    }
  };

  return (
    <div className={className} {...rest} onClick={() => navigationHandler()}>
      {!!children && children}
    </div>
  );
};
export default Navigator;
