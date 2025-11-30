// 📦 Third-Party imports
import Image from 'next/image';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const Description: React.FC<PropsT> = ({ children }) => {
  return (
    <>
      <div className="bg-background/55 mt-10 rounded-sm p-4">
        <div className="relative min-h-[7.75rem] gap-10">
          <div className="absolute">
            <Image
              className="drop-shadow-primary/30 drop-shadow-2xl"
              src={'/svgs/dashboard/kyc-description.svg'}
              width={184}
              height={184}
              alt="KYC Verification"
            />
          </div>

          <div className="absolute top-0 bottom-0 left-52 my-auto h-fit">
            <h4 className="text-lg font-medium">
              After completing this process, you will be entitled to the below
              privileges
            </h4>
            <ul className="mt-3 list-disc pl-8">
              <li>Increase 24-hour withdrawal limit to 200 BTC</li>
              <li>Fiat-Crypto Purchase</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 px-8">
        <ul className="list-disc font-medium opacity-85 *:mt-4">
          <li>
            <p>You can verify with ID Card, Driving Licence and Passport.</p>
          </li>
          <li>
            <p>
              Please make sure that the info provided is identical to your ID
              info, and these informations cannot be altered once the ID
              verification is approved.
            </p>
          </li>
          <li>
            <p>
              We only collect your personal information for the sole purpose of
              identity verification. We are committed to ensuring the highest
              level of security for your information, utilizing advanced
              encryption and protection protocols to safeguard your privacy.
            </p>
          </li>
          <li>
            <p>
              The audit results will be sent to your Email in 1~3 working days.
              Please check your mailbox.
            </p>
          </li>
        </ul>
      </div>

      {children}
    </>
  );
};
export default Description;
