// Directives
"use client";

// Packages imports
import { useState, useLayoutEffect } from "react";

// Local imports
import HeaderAccountUi from "./HeaderAccount.ui";

// Functional component
export default function HeaderAccountFn() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useLayoutEffect(() => {
    const checkAuth = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const resp = await fetch(`${baseUrl}/api/auth/verify-session`);
      const json = await resp.json();

      setIsAuthenticated(json.isAuthenticated);
    };
    checkAuth();
  }, []);

  return <HeaderAccountUi isAuthenticated={isAuthenticated} />;
}
