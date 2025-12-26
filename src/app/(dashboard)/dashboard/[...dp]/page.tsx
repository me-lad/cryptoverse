// 📦 Third-Party imports
import { redirect } from 'next/navigation';

// 📦 Internal imports
import DashboardHeader from '~modules/layouts/dashboard/header';
import DevelopingPage from '~modules/layouts/dashboard/developing-page';
import ContentLayout from '~modules/layouts/dashboard/content-layout';

// 🧾 Local types and variables
interface PropsT {
  params: Promise<{ dp: string | string[] }>;
}

const developingPages: { [key: string]: string } = {
  kyc: 'KYC Verification',
  'wallet/assets': 'Assets ',
  'wallet/deposit': 'Deposit ',
  'wallet/withdraw': 'Withdraw ',
  transactions: 'Transactions',
  'market-overview': 'Market Overview',
  'two-factor-auth': 'Two Factor Authentication',
  'device-management': 'Device Management',
  performance: 'Performance',
  'tax-reports': 'Tax Reports',
  'account-management/security': 'Security',
  'account-management/trading': 'Trading',
  'account-management/notification': 'Notification',
  support: 'Support & Help Center',
  notifications: 'Notification Center',
};

// ⚙️ Functional component
const Page = async ({ params }: PropsT) => {
  const { dp } = await params;

  const developingPage = typeof dp === 'string' ? dp : dp.join('/');

  if (!developingPages?.[developingPage]) return redirect('/not-found');

  const title = developingPages[developingPage];

  return (
    <>
      <DashboardHeader title={title} />
      <ContentLayout>
        <DevelopingPage />
      </ContentLayout>
    </>
  );
};
export default Page;
