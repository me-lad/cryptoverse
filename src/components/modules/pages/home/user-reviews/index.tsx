// 📌 Directives
'use client';

// 📦 Third-Party imports
import Image from 'next/image';
import dynamic from 'next/dynamic';

// 📦 Internal imports
import { containerDefault } from '~styles/tw-custom';
import { CustomTag, CustomTitle } from '~core/ui/shared/typography';
const Slider = dynamic(() => import('./Slider'), {
  ssr: false,
});

// ⚙️ Functional component
const UserReviews = () => {
  return (
    <section className={`${containerDefault} relative mt-32`}>
      {/* Heading */}
      <div>
        <CustomTag text="User Reviews" />
        <CustomTitle text="What our users say" />
      </div>

      {/* Commas */}
      <div className="hidden min-h-20 sm:block">
        <div className="absolute top-0 left-5 mt-2.5 sm:mt-0 lg:left-0">
          <Image
            src={'/svgs/home-page/commas.svg'}
            width={110}
            height={98}
            alt="Comma"
            className="scale-[0.8] lg:scale-100"
          />
        </div>
      </div>

      {/* Slider */}
      <Slider />

      {/* Inverted commas */}
      <div className="min-h-20 sm:mt-20">
        <div className="absolute bottom-0 left-5 mt-2.5 sm:mt-0 sm:hidden lg:left-0">
          <Image
            src={'/svgs/home-page/commas.svg'}
            width={110}
            height={98}
            alt="Comma"
            className="scale-[0.7] min-[28em]:scale-[0.8] lg:scale-100"
          />
        </div>

        <div className="absolute right-5 bottom-0 mt-2.5 sm:mt-0 lg:right-0">
          <Image
            src={'/svgs/home-page/inverted-commas.svg'}
            width={110}
            height={98}
            alt="Comma invert"
            className="scale-[0.7] min-[28em]:scale-[0.8] lg:scale-100"
          />
        </div>
      </div>
    </section>
  );
};
export default UserReviews;
