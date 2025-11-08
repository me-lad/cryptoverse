// 📦 Internal imports
import DashboardHeader from '~modules/layouts/dashboard/header';
import ContentLayout from '~modules/layouts/dashboard/content-layout';
import KycWrapper from '~modules/pages/dashboard/kyc/Kyc.wrapper';

// ⚙️ Functional component
const Page = () => {
  return (
    <>
      <DashboardHeader title="KYC Verification" />

      <ContentLayout>
        <KycWrapper />
      </ContentLayout>
    </>
  );
};
export default Page;
