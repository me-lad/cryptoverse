import type { CurrencyConversionFactorsT, CurrencyT } from '../../coins';

export interface GetCurrencyConversionFactors {
  result: 'success' | 'error';
  time_next_update_unix: number;
  base_code: CurrencyT;
  rates: CurrencyConversionFactorsT;
}
