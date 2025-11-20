import type { GetWidgetCoins } from '~types/api-generated/coins/getWidgetCoins';
import { safeFetch } from '~helpers/safeFetch';

export const getTopLoserCoins = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD&sort_direction=ASC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
  return await safeFetch<GetWidgetCoins>(
    fetchUrl,
    'Something went wrong getting top loser coins.',
  );
};

export const getTopGainerCoins = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
  return await safeFetch<GetWidgetCoins>(
    fetchUrl,
    'Something went wrong getting top gainer coins.',
  );
};

export const getLastUpdatedCoins = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=UPDATED_ON&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
  return await safeFetch<GetWidgetCoins>(
    fetchUrl,
    'Something went wrong getting last updated coins.',
  );
};
