import type { CurrencyConversionFactorsT, CurrencyT } from '~types/coins';
import type { GetCurrencyConversionFactors } from '~types/api-generated/coins/getConversionFactors';

export const getConversionFactors = async (
  baseCurrency: CurrencyT,
): Promise<CurrencyConversionFactorsT | undefined> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/api/currency`;
  const resp = await fetch(fetchUrl, {
    method: 'POST',
    body: JSON.stringify({ baseCurrency }),
  });
  const result: GetCurrencyConversionFactors = await resp.json();
  if (result.result === 'error') return;

  const rates: CurrencyConversionFactorsT = {
    USD: result.rates.USD,
    EUR: result.rates.EUR,
    GBP: result.rates.GBP,
    JPY: result.rates.JPY,
    IRR: result.rates.IRR,
  };

  if (baseCurrency === 'IRR') {
    try {
      const respIRR = await fetch(`${fetchUrl}/irr`, { method: 'GET' });
      const resultIRR = await respIRR.json();
      rates.USD = 1 / resultIRR / 10;
    } catch (err) {
      console.log(err);
    }
  }

  return rates;
};
