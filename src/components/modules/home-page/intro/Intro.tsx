// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { flexCenter, containerDefault, flexBetween } from '~styles/tw-custom';

// ⚙️ Functional component
const Intro = () => {
  return (
    <section className={`${containerDefault} ${flexBetween} mt-32`}>
      <div>
        <div className="text-5xl font-medium">
          <p>
            Trade Smarter <span className="text-[2.5rem]">&</span>
          </p>
        </div>
        <div className={`${flexCenter} mt-2 gap-2 text-5xl font-medium`}>
          <p>Grow Faster with </p>
          <h1 className="text-primary font-bold">CryptoVerse</h1>
        </div>
      </div>
      <div>
        <Image
          className="drop-shadow-2xl drop-shadow-neutral-800"
          src={'/images/home-page/home-intro.png'}
          alt="Crypto Verse"
          width={630}
          height={410}
        />
      </div>
    </section>
  );
};
export default Intro;
