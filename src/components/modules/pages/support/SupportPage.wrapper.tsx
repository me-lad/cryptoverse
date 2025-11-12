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
    <div className="mx-5 mt-32 lg:mx-0">
      <div
        style={{
          backgroundImage: "url('/svgs/support-page/line.svg')",
          backgroundSize: 'contain',
        }}
      >
        <div
          className={`${containerDefault} ${flexCenter} glass-bg flex-col-reverse rounded-sm border border-white/25 bg-white/5 px-5 py-20 backdrop-brightness-[35%] lg:flex-row`}
        >
          {/* Form */}
          <div className="w-full max-lg:mt-10 max-lg:border-t max-lg:pt-10 sm:px-10 lg:w-1/2">
            <div className="ml-1 w-fit">
              <CustomTag text="Leave a message for us" />
            </div>
            <SupportForm />
          </div>

          {/* Details */}
          <div className="w-full sm:px-10 lg:w-1/2">
            <Image
              className="mx-auto drop-shadow-[0_0_0.3rem_var(--color-primary)]"
              src={'/images/support-page/headset.png'}
              width={220}
              height={165}
              alt="Support Headset"
            />
            <h2 className="mt-8 text-center text-3xl font-semibold sm:text-4xl">
              Contact Support
            </h2>
            <p className="mt-3 text-center font-medium tracking-wide text-neutral-300 sm:text-lg">
              Get in touch with the support team at CryptoVerse for any kind of
              assistance you need.
            </p>
            <div className="flex items-center justify-center max-sm:flex-col sm:gap-10">
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
