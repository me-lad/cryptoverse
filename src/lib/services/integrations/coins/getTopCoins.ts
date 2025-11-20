import type { GetTopCoins } from '~types/api-generated/getTopCoins';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { showFallbackCatcher } from './shared';

export const getTopCoins = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    return await useServerFetch<GetTopCoins>(fetchUrl, {
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};
