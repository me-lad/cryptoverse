// 📌 Directives
'use client';

import Image from 'next/image';
// 📦 Third-Party imports
import React, { use } from 'react';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import { formatPrice } from '~helpers/formatters';
import { CurrencyContext } from '~modules/Currency.context';

// 🧾 Local types
interface PropsT extends React.ComponentProps<'span'> {
  price: number;
}

// ⚙️ Functional component
export const Price: React.FC<PropsT> = ({ price, className, ...rest }) => {
  const { currency, conversionFactors } = use(CurrencyContext);

  return (
    <span className={cn('flex items-center gap-1', className)} {...rest}>
      <Image
        className="mt-0.5"
        src={`/svgs/logo/currencies/${currency?.toLocaleLowerCase()}.svg`}
        width={25}
        height={25}
        alt={currency || ''}
      />
      {formatPrice(
        price,
        conversionFactors?.USD,
        conversionFactors && currency && conversionFactors[currency],
      )}
    </span>
  );
};
