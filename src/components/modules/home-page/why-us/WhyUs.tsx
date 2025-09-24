// 📦 Internal imports
import { containerDefault, flexCenter } from '~styles/tw-custom';
import { CustomTag, CustomTitle } from '~core/ui/shared/typography';
import { properties } from './local';
import Card from './Card';

// ⚙️ Functional component
const WhyUs = () => {
  return (
    <section className={`${containerDefault} mt-32`}>
      <div className={`${flexCenter} flex-col`}>
        <CustomTag text="Why Us ?" />
        <CustomTitle
          text={
            <>
              Key Features of
              <span className="text-primary font-bold">CryptoVerse</span>
            </>
          }
        />

        {/* Content */}
        <ul className="mt-10 grid w-full grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card {...property} key={property.id.toString()} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default WhyUs;
