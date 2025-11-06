// 📦 Third-Party imports
import DashboardHeader from '~modules/layouts/dashboard/header';
import ContentLayout from '~modules/layouts/dashboard/content-layout';
import MainPageWrapper from '~modules/pages/dashboard/main-page/MainPage.wrapper';

// ⚙️ Functional component
export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />

      <ContentLayout>
        <MainPageWrapper />
      </ContentLayout>
    </>
  );
}
