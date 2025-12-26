// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 📦 Internal imports
import type {
  HeaderReceivableUserDataT,
  HeaderReceivableUserDataQueryT,
} from '~types/dto/user';
import { errorToast } from '~vendors/react-toastify';
import HeaderAccountUi from './HeaderAccount.ui';

// ⚙️ Functional component
export default function HeaderAccountFn() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // 🔹 Auth check query
  const { data: authData } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const resp = await fetch(`${baseUrl}/api/auth/verify-session`);
      if (!resp.ok) throw new Error('Auth check failed');
      return resp.json();
    },
  });

  const isAuthenticated = authData?.isAuthenticated ?? false;
  const username = authData?.username ?? '';

  // 🔹 User data query (enabled only when authenticated)
  const { data: userDataResp } = useQuery<{
    data: HeaderReceivableUserDataT;
  }>({
    queryKey: ['userData', username],
    queryFn: async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const query: HeaderReceivableUserDataQueryT =
        'username profileImage phoneNumber id';
      const fetchUrl = `${baseUrl}/api/user/user-data?username=${username}&query=${query} id`;
      const resp = await fetch(fetchUrl);
      if (!resp.ok) throw new Error('User data fetch failed');
      return resp.json();
    },
    enabled: isAuthenticated && !!username,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  }, [pathname]);

  const userData = userDataResp?.data;

  // 🔹 Signout handler
  const signoutHandler = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const fetchUrl = `${baseUrl}/api/auth/signout`;
      const resp = await fetch(fetchUrl, { method: 'POST' });
      const json = await resp.json();

      if (resp.ok) {
        // Refresh server-rendered state
        router.refresh();
        // Invalidate queries so they re-fetch
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        queryClient.invalidateQueries({ queryKey: ['userData'] });
      } else {
        errorToast(json.message || 'Signout failed');
      }
    } catch {
      errorToast('Network error during signout');
    }
  };

  return (
    <HeaderAccountUi
      isAuthenticated={isAuthenticated}
      userData={userData}
      signoutHandler={signoutHandler}
    />
  );
}
