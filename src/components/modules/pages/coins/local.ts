// Imports
import type { ContextGeneralT } from '~contexts/local';
import { sharedReducer } from '~contexts/index.reducer';
import type {
  CoinsContextDataT,
  CoinsContextFlagsT,
  CoinsContextParamsT,
} from '~types/coins';

// Exports
export type CoinsContextT = ContextGeneralT<
  CoinsContextDataT,
  CoinsContextParamsT,
  CoinsContextFlagsT
>;

export const initialState: CoinsContextT = {
  data: { coins: [] },
  params: {
    page: 1,
    perPage: 20,
    order: 'market_cap_desc',
  },
  flags: { isFetching: false },
};

export const coinsReducer = sharedReducer<
  CoinsContextDataT,
  CoinsContextParamsT,
  CoinsContextFlagsT
>;
