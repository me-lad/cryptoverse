// 📦 Internal imports
import DashboardHeader from '~modules/layouts/dashboard/header';
import ContentLayout from '~modules/layouts/dashboard/content-layout';
import KycWrapper from '~modules/pages/dashboard/kyc/Kyc.wrapper';
import DevelopingPage from '~modules/layouts/dashboard/developing-page';

// ⚙️ Functional component
const Page = () => {
  return (
    <>
      <DashboardHeader title="KYC Verification" />

      <ContentLayout>
        <div className="pt-88 xl:hidden">
          <DevelopingPage />
        </div>
        <div className="hidden xl:block">
          <KycWrapper />
        </div>
      </ContentLayout>
    </>
  );
};
export default Page;
