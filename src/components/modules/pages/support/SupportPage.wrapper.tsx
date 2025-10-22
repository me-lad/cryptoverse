// 📦 Third-Party imports
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

// 📦 Internal imports
import { containerDefault, flexCenter } from '~styles/tw-custom';
import { CustomTag } from '~core/ui/shared/typography';
import SupportForm from './SupportForm';

// ⚙️ Functional component
const SupportPageWrapper = () => {
  return (
    <div className="mt-32">
      <div
        style={{
          backgroundImage: "url('/svgs/support-page/line.svg')",
          backgroundSize: 'contain',
        }}
      >
        <div
          className={`${containerDefault} ${flexCenter} glass-bg rounded-sm border border-white/25 bg-white/5 px-10 py-20 backdrop-brightness-[35%]`}
        >
          {/* Form */}
          <div className="w-1/2 px-10">
            <div className="ml-1 w-fit">
              <CustomTag text="Leave a message for us" />
            </div>
            <SupportForm />
          </div>

          {/* Details */}
          <div className="w-1/2 px-10">
            <Image
              className="mx-auto drop-shadow-[0_0_0.3rem_var(--color-primary)]"
              src={'/images/support-page/headset.png'}
              width={220}
              height={165}
              alt="Support Headset"
            />
            <h2 className="mt-8 text-center text-4xl font-semibold">
              Contact Support
            </h2>
            <p className="mt-3 text-center text-lg font-medium tracking-wide text-neutral-300">
              Get in touch with the support team at CryptoVerse for any kind of
              assistance you need.
            </p>
            <div className="flex items-center justify-center gap-10">
              <div className="mt-4 flex items-center gap-2 text-neutral-300">
                <Phone size={17} className="mt-0.5" />
                <span className="tracking-wider">021-01020316</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-neutral-300">
                <Mail size={17} className="mt-0.5" />
                <span className="tracking-tight">Support@CryptoVerse.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportPageWrapper;
