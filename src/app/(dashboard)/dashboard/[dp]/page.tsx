// 📦 Third-Party imports
import { notFound, redirect } from 'next/navigation';

// 📦 Internal imports
import DashboardHeader from '@/components/modules/layouts/dashboard/header';
import DevelopingPage from '~modules/layouts/dashboard/developing-page';
import ContentLayout from '~modules/layouts/dashboard/content-layout';

// 🧾 Local types and variables
interface PropsT {
  params: Promise<{ dp: string }>;
}

const developingPages: { [key: string]: string } = {
  kyc: 'KYC Verification',
  assets: 'Wallet / Assets',
  deposit: 'Wallet / Deposit',
  withdraw: 'Wallet / Withdraw',
  transactions: 'Transactions',
  'two-factor-auth': 'Two Factor Authentication',
  'device-management': 'Device Management',
  performance: 'Performance',
  'tax-reports': 'Tax Reports',
  'account-management': 'Account Management',
  support: 'Support & Help Center',
  notifications: 'Notification Center',
};

// ⚙️ Functional component
const Page = async ({ params }: PropsT) => {
  const { dp } = await params;

  if (!developingPages?.[dp]) return redirect('/not-found');

  const title = developingPages[dp];

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
