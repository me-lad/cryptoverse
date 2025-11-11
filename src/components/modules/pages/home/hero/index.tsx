// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { flexCenter, containerDefault, flexBetween } from '~styles/tw-custom';

// ⚙️ Functional component
const Hero = () => {
  return (
    <section className={`${containerDefault} ${flexBetween} mt-32`}>
      <div className="hidden w-full max-[32.5em]:block">
        <p className="text-center text-3xl">
          Trade Smarter <small className="text-[1.75rem]">&</small> Grow Faster
          with{' '}
        </p>
        <h1 className="text-primary mt-2.5 text-center text-4xl font-bold">
          CryptoVerse
        </h1>
      </div>
      <div className="max-[48em]:w-full max-[32.5em]:hidden">
        <div className="text-4xl font-medium min-[71.75em]:text-[2.75rem] md:text-[2rem] lg:text-4xl xl:text-5xl">
          <p className="max-[48em]:text-center">
            Trade Smarter{' '}
            <span className="text-3xl min-[71.75em]:text-[2rem] xl:text-[2.5rem]">
              &
            </span>
          </p>
        </div>
        <div
          className={`${flexCenter} mt-2 gap-2 text-4xl font-medium min-[71.75em]:text-[2.75rem] md:text-[2rem] lg:text-4xl xl:text-5xl`}
        >
          <p>Grow Faster with </p>
          <h1 className="text-primary font-bold">CryptoVerse</h1>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          className="drop-shadow-2xl drop-shadow-neutral-800 max-[92.5em]:w-[36rem] max-[88.125em]:w-[32rem] max-[83.75em]:w-[28rem] max-[71.75em]:w-[24rem] max-[64em]:w-[18.5rem]"
          src={'/images/home-page/home-Hero.png'}
          alt="Crypto Verse"
          width={630}
          height={410}
        />
      </div>
    </section>
  );
};
export default Hero;
