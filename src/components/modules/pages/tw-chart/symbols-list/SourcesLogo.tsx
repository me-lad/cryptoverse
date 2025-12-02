// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import { flexCenter } from '~styles/tw-custom';

// 📦 Internal imports

// 🧾 Local types
interface PropsT {
  baseCurrencyLogo?: string;
  currencyLogo?: string;
}

const SourcesLogo: React.FC<PropsT> = (props) => {
  const { baseCurrencyLogo, currencyLogo } = props;

  if (!baseCurrencyLogo && !currencyLogo) {
    return (
      <Image
        src={'/svgs/logo/logo.svg'}
        width={30}
        height={30}
        alt="Crypto Verse"
      />
    );
  }

  if (!currencyLogo) {
    return (
      <div className={`${flexCenter} relative size-7 rounded-full`}>
        <Image
          className="size-5 rounded-full"
          width={1}
          height={1}
          src={`https://s3-symbol-logo.tradingview.com/${baseCurrencyLogo}.svg`}
          alt={baseCurrencyLogo || 'Crypto Verse'}
        />
      </div>
    );
  }

  if (!baseCurrencyLogo) {
    return (
      <div className={`${flexCenter} relative size-7 rounded-full`}>
        <Image
          className="size-5 rounded-full"
          width={1}
          height={1}
          src={`https://s3-symbol-logo.tradingview.com/${currencyLogo}.svg`}
          alt={currencyLogo}
        />
      </div>
    );
  }

  return (
    <div className="relative size-7 rounded-full">
      <div className="absolute top-0 right-0 size-7/12 rounded-full">
        <Image
          className="rounded-full"
          src={`https://s3-symbol-logo.tradingview.com/${currencyLogo}.svg`}
          fill
          alt={currencyLogo}
        />
      </div>
      <div
        className={`${flexCenter} bg-background-lighter absolute bottom-0 left-0 size-10/12 rounded-full`}
      >
        <Image
          className="rounded-full"
          src={`https://s3-symbol-logo.tradingview.com/${baseCurrencyLogo}.svg`}
          width={19}
          height={19}
          alt={baseCurrencyLogo}
        />
      </div>
    </div>
  );
};

export default SourcesLogo;
