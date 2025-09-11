// Directives
"use client";

// Packages imports
import React from "react";
import { usePathname } from "next/navigation";

// Local imports
import { headerLessRoutes } from "~constants/routes";
import HeaderUi from "./Header.ui";

// Functional component
export default function HeaderFn() {
  const pathname = usePathname();
  if (headerLessRoutes.includes(pathname)) return null;

  return <HeaderUi />;
}
