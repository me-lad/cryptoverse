// 📦 Third-Party imports
import Image from 'next/image';

// ⚙️ Functional component
const Done = () => {
  return (
    <div className="my-10">
      <div className="flex justify-center">
        <Image
          src={'/svgs/dashboard/kyc-wait.svg'}
          width={160}
          height={160}
          alt="Kyc Done"
        />
      </div>
      <p className="mx-auto w-4/5 text-center text-lg font-extralight">
        Your submitted documents are currently under review to verify your
        identity. This process may take some time depending on the volume of
        requests. We will notify you once your verification is complete. Thank
        you for your patience as we work to ensure the security of your account.
      </p>
    </div>
  );
};
export default Done;
