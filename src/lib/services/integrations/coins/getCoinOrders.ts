import type { GetCoinOrders } from '~types/api-generated/coins/getCoinOrders';
import { safeFetch } from '~helpers/safeFetch';
import { minutesToMillisecond } from '~helpers/time';

export const getCoinOrders = async (coinSymbol: string) => {
  const fetchUrl = `https://api.binance.com/api/v3/depth?symbol=${coinSymbol.toUpperCase()}USDT&limit=14`;
  return await safeFetch<GetCoinOrders>(
    fetchUrl,
    'Something went wrong getting coin orders.',
    { next: { revalidate: minutesToMillisecond(1) } },
  );
};
