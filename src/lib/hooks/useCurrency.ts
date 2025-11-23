// 📦 Third-Party imports
import { use } from 'react';

// 📦 Internal imports
import { CurrencyContext } from '@/components/contexts/Currency.context';
import { formatPrice } from '~helpers/formatters';

// ⚙️ Custom hook
export const useCurrency = (
  price: number,
  shortenUnits?: boolean,
  fullPrecision?: boolean,
) => {
  const { currency, conversionFactors } = use(CurrencyContext);

  const convertedPrice = formatPrice(
    price,
    conversionFactors?.USD,
    conversionFactors && currency && conversionFactors[currency],
    shortenUnits,
    fullPrecision,
  );

  return { convertedPrice };
};
