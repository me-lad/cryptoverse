// 📦 Internal imports
import InsetHeading from '@/components/modules/layouts/dashboard/header';
import DevelopingPage from '~modules/layouts/dashboard/developing-page';

// ⚙️ Functional component
const Page = () => {
  return (
    <>
      <InsetHeading title="KYC Verification" />
      <div className="mt-10">
        <DevelopingPage />
      </div>
    </>
  );
};
export default Page;
