// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import AccountManagementWrapper from '~modules/layouts/dashboard/AccountManagement.wrapper';
import DashboardHeader from '~modules/layouts/dashboard/header';
import ContentLayout from '~modules/layouts/dashboard/content-layout';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DashboardAccountManagementLayout: React.FC<PropsT> = ({ children }) => {
  return (
    <>
      <DashboardHeader title="Account Management" />

      <ContentLayout>
        <AccountManagementWrapper>{children}</AccountManagementWrapper>
      </ContentLayout>
    </>
  );
};
export default DashboardAccountManagementLayout;
