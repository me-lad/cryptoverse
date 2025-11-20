import type { NewsContextParamsT } from '~types/news';
import type { GetLatestNews } from '~types/api-generated/news/getLatestNews';
import { buildUrl } from '~helpers/generators';
import { safeFetch } from '~helpers/safeFetch';

type ParamsT = NewsContextParamsT & { limit?: number; timestamp?: number };

export const getNews = async (params: ParamsT, options?: RequestInit) => {
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

  return await safeFetch<GetLatestNews>(
    fetchUrl,
    'Something went wrong in fetching news data.',
    options,
  );
};
