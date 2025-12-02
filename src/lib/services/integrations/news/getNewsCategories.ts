import type { GetNewsCategories } from '~types/api-generated/news/getNewsCategories';
import { buildUrl } from '~helpers/generators';
import { safeFetch } from '~helpers/safeFetch';

export const getNewsCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = buildUrl(`${baseUrl}/news/v1/category/list`, {
    status: 'ACTIVE',
  });

  return await safeFetch<GetNewsCategories>(
    fetchUrl,
    'Something went wrong getting news categories data.',
    {
      method: 'GET',
    },
  );
};
