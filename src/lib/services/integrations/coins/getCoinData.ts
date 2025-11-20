import type { GetCoinData } from '~types/api-generated/getCoinData';
import { useServerFetch } from '~hooks/useServerFetch';
import { minutesToMillisecond } from '~helpers/time';
import { showFallbackCatcher } from './shared';

export const getCoinData = async (coinId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}?developer_data=false&tickers=false&localization=false&community_data=false`;
    return await useServerFetch<GetCoinData>(fetchUrl, {
      next: {
        revalidate: minutesToMillisecond(2.5),
      },
    });
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};
