export type CurrencyT = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'IRR';

export type CurrencyConversionFactorsT = Record<CurrencyT, number>;

export interface CurrencyContextT {
  currency: CurrencyT;
  conversionFactors?: CurrencyConversionFactorsT;
  setCurrency: (value: CurrencyT) => void;
}
