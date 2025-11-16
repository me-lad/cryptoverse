// 📦 Internal imports
import type { NewsLanguagesT, NewsContextParamsT } from '~types/news';
import type { GetLatestNews } from '~types/api-generated/getLatestNews';
import type { GetNewsCategories } from '~types/api-generated/getNewsCategories';
import type { GetNewsSources } from '~types/api-generated/getNewsSources';
import { daysToMinutes } from '~helpers/time';
import { buildUrl } from '~helpers/generators';
import { useServerFetch } from '~hooks/useServerFetch';

// Fetch news sources
export const getNewsSources = async (language: NewsLanguagesT) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = buildUrl(`${baseUrl}/news/v1/source/list`, {
    language,
    status: 'ACTIVE',
  });

  return await useServerFetch<GetNewsSources>(fetchUrl, {
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: daysToMinutes(3) * 60 },
  });
};

// Fetch news categories
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

// Fetch filtered news
export const getNews = async (
  params: NewsContextParamsT & { limit?: number; timestamp?: number },
) => {
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

// Search news
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
