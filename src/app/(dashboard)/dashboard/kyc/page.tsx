// 📦 Internal imports
import InsetHeading from '~modules/layouts/dashboard/inset-heading';
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
