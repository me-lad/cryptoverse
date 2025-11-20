import type { GetLatestNews } from '~types/api-generated/getLatestNews';
import { buildUrl } from '~helpers/generators';
import { useServerFetch } from '~hooks/useServerFetch';

export const searchNews = async (
  searchString: string,
  source: string,
  timestamp?: number,
) => {
  const url = buildUrl(
    `${process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE}/news/v1/search`,
    {
      search_string: searchString,
      to_ts: timestamp,
      source_key: source,
      sortOrder: 'latest',
    },
  );

  return await useServerFetch<GetLatestNews>(url, {
    method: 'GET',
  });
};
