import type { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { showFallbackCatcher } from './shared';

export const getCoinChartData = async (coinId: string, cycle: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${cycle}`;
    return await useServerFetch<GetCoinChartData>(fetchUrl, {
      next: {
        revalidate: minutesToMillisecond(2.5),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};
