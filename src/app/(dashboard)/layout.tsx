// Packages imports
import React from "react";

// Local imports
import DashboardAccessControl from "@/components/modules/global/AccessControl.Dashboard";

// Local types
interface PropsType {
  children: React.ReactNode;
}

// Functional component
export default function DashboardLayout({ children }: PropsType) {
  return <DashboardAccessControl>{children}</DashboardAccessControl>;
}
