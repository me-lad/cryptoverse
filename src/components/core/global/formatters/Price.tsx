// 📌 Directives
'use client';

import Image from 'next/image';
// 📦 Third-Party imports
import React, { use } from 'react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { formatPrice } from '~helpers/formatters';
import { CurrencyContext } from '~modules/Currency.context';
import clsx from 'clsx';

// 🧾 Local types
interface PropsT extends React.ComponentProps<'span'> {
  price: number;
  shortenUnits?: boolean;
  darkTheme?: true;
  imageWidth?: number;
  imageHeight?: number;
}

// ⚙️ Functional component
export const Price: React.FC<PropsT> = (props) => {
  const {
    price,
    shortenUnits,
    darkTheme,
    imageWidth,
    imageHeight,
    className,
    ...rest
  } = props;
  const { currency, conversionFactors } = use(CurrencyContext);

  return (
    <span className={cn('flex items-center gap-1', className)} {...rest}>
      {!price ? (
        <span className="w-full text-center">__</span>
      ) : (
        <>
          <Image
            className={clsx('mt-0.5', darkTheme && 'invert-100')}
            src={`/svgs/logo/currencies/${currency?.toLocaleLowerCase()}.svg`}
            width={imageWidth || 25}
            height={imageHeight || 25}
            alt={currency || ''}
          />
          {formatPrice(
            price,
            conversionFactors?.USD,
            conversionFactors && currency && conversionFactors[currency],
            shortenUnits,
          )}
        </>
      )}
    </span>
  );
};
