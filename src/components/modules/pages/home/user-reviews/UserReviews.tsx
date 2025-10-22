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
      <div className="min-h-20">
        <div className="absolute top-0 left-0">
          <Image
            src={'/svgs/home-page/commas.svg'}
            width={110}
            height={98}
            alt="Comma"
          />
        </div>
      </div>

      {/* Slider */}
      <Slider />

      {/* Inverted commas */}
      <div className="min-h-20">
        <div className="absolute right-0 bottom-0">
          <Image
            src={'/svgs/home-page/inverted-commas.svg'}
            width={110}
            height={98}
            alt="Comma invert"
          />
        </div>
      </div>
    </section>
  );
};
export default UserReviews;
