// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import { DashboardAccessControl } from '~core/global/access-controls';
import DashboardContext from '~modules/layouts/dashboard/Dashboard.context';
import DashboardWrapper from '~modules/layouts/dashboard/Dashboard.wrapper';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
export default function DashboardLayout({ children }: PropsT) {
  return (
    <DashboardAccessControl>
      <DashboardContext>
        <DashboardWrapper>{children}</DashboardWrapper>
      </DashboardContext>
    </DashboardAccessControl>
  );
}
