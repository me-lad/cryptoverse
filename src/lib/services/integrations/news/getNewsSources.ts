import type { NewsLanguagesT } from '~types/news';
import type { GetNewsSources } from '~types/api-generated/getNewsSources';
import { daysToMinutes } from '~helpers/time';
import { buildUrl } from '~helpers/generators';
import { useServerFetch } from '~hooks/useServerFetch';

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
