import type { GetNewsCategories } from '~types/api-generated/getNewsCategories';
import { daysToMinutes } from '~helpers/time';
import { buildUrl } from '~helpers/generators';
import { useServerFetch } from '~hooks/useServerFetch';

export const getNewsCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = buildUrl(`${baseUrl}/news/v1/category/list`, {
    status: 'ACTIVE',
  });

  return await useServerFetch<GetNewsCategories>(fetchUrl, {
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: daysToMinutes(3) * 60 },
  });
};
