import type { NewsLanguagesT } from '~types/news';
import type { GetNewsSources } from '~types/api-generated/news/getNewsSources';
import { buildUrl } from '~helpers/generators';
import { safeFetch } from '~helpers/safeFetch';

export const getNewsSources = async (language: NewsLanguagesT) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_CRYPTOCOMPARE;
  const fetchUrl = buildUrl(`${baseUrl}/news/v1/source/list`, {
    language,
    status: 'ACTIVE',
  });

  return safeFetch<GetNewsSources>(
    fetchUrl,
    'Something went wrong getting news sources data.',
    {
      method: 'GET',
    },
  );
};
