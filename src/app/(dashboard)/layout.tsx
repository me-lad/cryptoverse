// 📦 Third-Party imports
import React from 'react';
import { SidebarInset, SidebarProvider } from '~core/ui/shadcn/sidebar';

// 📦 Internal imports
import { DashboardAccessControl } from '~core/global/access-controls';
import Sidebar from '~modules/layouts/dashboard/Sidebar';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
export default function DashboardLayout({ children }: PropsT) {
  return (
    <DashboardAccessControl>
      <SidebarProvider className="mt-8 gap-x-2 px-24">
        <Sidebar />

        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </DashboardAccessControl>
  );
}
