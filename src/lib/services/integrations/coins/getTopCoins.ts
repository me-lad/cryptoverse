import type { GetTopCoins } from '~types/api-generated/getTopCoins';
import { safeFetch } from '~helpers/safeFetch';
import { minutesToMillisecond } from '~helpers/time';

export const getTopCoins = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
  const fetchUrl = `${baseUrl}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
  return await safeFetch<GetTopCoins>(
    fetchUrl,
    'Something went wrong getting top coins list.',
    {
      cache: 'force-cache',
      next: {
        revalidate: minutesToMillisecond(1),
      },
    },
  );
};
