// 📦 Internal imports
import DashboardHeader from '~modules/layouts/dashboard/header';
import ContentLayout from '~modules/layouts/dashboard/content-layout';
import MarketOverviewWrapper from '~modules/pages/dashboard/market-overview/MarketOverview.wrapper';

// ⚙️ Functional component
const Page = () => {
  return (
    <>
      <DashboardHeader title="Market Overview" />

      <ContentLayout>
        <MarketOverviewWrapper />
      </ContentLayout>
    </>
  );
};
export default Page;
