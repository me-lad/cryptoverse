import type { NewsContextParamsT } from '~types/news';
import type { GetLatestNews } from '~types/api-generated/getLatestNews';
import { buildUrl } from '~helpers/generators';
import { useServerFetch } from '~hooks/useServerFetch';

type ParamsT = NewsContextParamsT & { limit?: number; timestamp?: number };

export const getNews = async (params: ParamsT) => {
  const {
    language = 'EN',
    limit = 20,
    sources,
    categories,
    excludeCategories,
    timestamp,
  } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = buildUrl(`${baseUrl}/news/v1/article/list`, {
    lang: language,
    source_ids: sources,
    categories,
    exclude_categories: excludeCategories,
    limit,
    to_ts: timestamp,
    sortOrder: 'latest',
  });

  return await useServerFetch<GetLatestNews>(fetchUrl, {
    method: 'GET',
  });
};
