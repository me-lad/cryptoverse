import type { GetCoinData } from '~types/api-generated/coins/getCoinData';
import { safeFetch } from '~helpers/safeFetch';
import { minutesToMillisecond } from '~helpers/time';

export const getCoinData = async (coinId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
  const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}?developer_data=false&tickers=false&localization=false&community_data=false`;
  return await safeFetch<GetCoinData>(
    fetchUrl,
    'Something went wrong getting coin data.',
    {
      next: {
        revalidate: minutesToMillisecond(2.5),
      },
    },
  );
};
