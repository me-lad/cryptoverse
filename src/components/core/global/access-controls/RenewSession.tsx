// 📌 Directives
'use client';

// 📦 Third-Party imports

import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

// 🧾 Local types
interface PropsT {
  userId: string;
}

// ⚙️ Functional component
const RenewSession: React.FC<PropsT> = ({ userId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isFetching, setIsFetching] = useState(true);

  useLayoutEffect(() => {
    const fetchRenewApi = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const resp = await fetch(`${baseUrl}/api/auth/renew-session`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const { success } = await resp.json();
      setIsFetching(false);

      if (success) {
        if (pathname === '/dashboard') return router.refresh();
        router.push('/dashboard');
      } else {
        router.push('/auth/signin');
      }
    };

    fetchRenewApi();
  }, []);

  useEffect(() => {
    if (isFetching) {
      const toastId = toast('Refreshing user sessions', {
        type: 'info',
        autoClose: false,
        className: 'border-b border-status-warning-200',
      });

      return () => toast.dismiss(toastId);
    }
  }, [isFetching]);

  return null;
};
export default RenewSession;
