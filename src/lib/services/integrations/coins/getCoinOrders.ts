import type { GetCoinOrders } from '~types/api-generated/getCoinOrders';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { showFallbackCatcher } from './shared';

export const getCoinOrders = async (coinSymbol: string) => {
  try {
    const fetchUrl = `https://api.binance.com/api/v3/depth?symbol=${coinSymbol.toUpperCase()}USDT&limit=14`;
    return await useServerFetch<GetCoinOrders>(fetchUrl, {
      next: {
        revalidate: minutesToMillisecond(1),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return { lastUpdateId: 0, bids: [], asks: [] };
  }
};
