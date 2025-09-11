// Directives
"use client";
import "client-only";

// Packages imports
import React from "react";
import { usePathname } from "next/navigation";

// Local imports
import { footerLessRoutes } from "~constants/routes";
import FooterUi from "./Footer.ui";

// Local types

// Functional component
export default function FooterFn() {
  const pathname = usePathname();
  if (footerLessRoutes.includes(pathname)) return null;

  return <FooterUi />;
}
