import type { GetCoinChartData } from '~types/api-generated/coins/getCoinChartData';
import { minutesToMillisecond } from '~helpers/time';
import { safeFetch } from '~helpers/safeFetch';

export const getCoinChartData = async (coinId: string, cycle: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
  const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${cycle}`;
  return await safeFetch<GetCoinChartData>(
    fetchUrl,
    'Something went wrong getting coin chart data.',
    { next: { revalidate: minutesToMillisecond(2.5) } },
  );
};
