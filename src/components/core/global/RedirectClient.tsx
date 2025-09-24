// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 🧾 Local types
type PropsT = {
  path: string;
  delay?: number;
};

// ⚙️ Functional component
const RedirectClient: React.FC<PropsT> = ({ path, delay }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(path);
    }, delay);

    return () => clearTimeout(timer);
  }, [path, delay]);

  return <div className="w-full text-center text-2xl">Redirecting...</div>;
};
export default RedirectClient;
