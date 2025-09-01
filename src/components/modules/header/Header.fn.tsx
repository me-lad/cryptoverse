// Directives
"use client";
import "client-only";

// Packages imports
import React from "react";
import { usePathname } from "next/navigation";

// Local imports
import { headerLessRoutes } from "@/lib/constants";
import HeaderUi from "./Header.ui";

// Local types

// Functional component
export default function HeaderFn() {
  const pathname = usePathname();
  if (headerLessRoutes.includes(pathname)) return null;

  return <HeaderUi />;
}
