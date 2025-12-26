// 📦 Internal imports
import DashboardHeader from '~modules/layouts/dashboard/header';
import ContentLayout from '~modules/layouts/dashboard/content-layout';
import PersonalInformationPageWrapper from '~modules/pages/dashboard/account-management/personal-information/PersonalInformationPage.wrapper';

// ⚙️ Functional component
const Page = () => {
  return (
    <>
      <DashboardHeader title="Personal Information" />

      <ContentLayout>
        <PersonalInformationPageWrapper />
      </ContentLayout>
    </>
  );
};
export default Page;
