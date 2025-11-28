// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState, useLayoutEffect, useEffect } from 'react';

// 📦 Internal imports
import HeaderAccountUi from './HeaderAccount.ui';
import type {
  HeaderReceivableUserDataT,
  HeaderReceivableUserDataQueryT,
} from '~types/dto/user';

// ⚙️ Functional component
export default function HeaderAccountFn() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUserName] = useState('');
  const [userData, setUserData] = useState<HeaderReceivableUserDataT>();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const resp = await fetch(`${baseUrl}/api/auth/verify-session`);
      const json = await resp.json();

      setIsAuthenticated(json.isAuthenticated);
      setUserName(json.username);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const getData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const query: HeaderReceivableUserDataQueryT =
        'fullName profileImage phoneNumber';
      const fetchUrl = `${baseUrl}/api/user/user-data?username=${username}&query=${query}`;
      const resp = await fetch(fetchUrl);
      const json = await resp.json();

      setUserData(json.data);
    };
    getData();
  }, [isAuthenticated]);

  console.log(userData);

  return (
    <HeaderAccountUi isAuthenticated={isAuthenticated} userData={userData} />
  );
}
