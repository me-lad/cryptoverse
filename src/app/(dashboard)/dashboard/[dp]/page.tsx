// 📦 Third-Party imports
import { notFound } from 'next/navigation';

// 📦 Internal imports
import InsetHeading from '@/components/modules/layouts/dashboard/header';
import DevelopingPage from '~modules/layouts/dashboard/developing-page';

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
  'market-overview': 'Market Overview',
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

  if (!developingPages?.[dp]) return notFound();

  const title = developingPages[dp];

  return (
    <>
      <InsetHeading title={title} />
      <div className="mt-10">
        <DevelopingPage />
      </div>
    </>
  );
};
export default Page;
