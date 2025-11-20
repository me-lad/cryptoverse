import { useServerFetch } from '~hooks/useServerFetch';
import { GetWidgetCoins } from '~types/api-generated/getWidgetCoins';
import { showFallbackCatcher } from './shared';

export const getLastUpdatedCoins = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
    const fetchUrl = `${baseUrl}/asset/v1/top/list?page=1&page_size=10&sort_by=UPDATED_ON&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK`;
    return await useServerFetch<GetWidgetCoins>(fetchUrl);
  } catch (err) {
    showFallbackCatcher(err);
    return;
  }
};
