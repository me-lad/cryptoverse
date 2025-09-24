// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { DashboardAccessControl } from '@/components/core/global/access-controls';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
export default function DashboardLayout({ children }: PropsT) {
  return <DashboardAccessControl>{children}</DashboardAccessControl>;
}
