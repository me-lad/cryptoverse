// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import NewsPageWrapper from '~modules/pages/news/NewsPage.wrapper';
import NewsPageContext from '~modules/pages/news/NewsPage.context';

interface PropsT {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

// ⚙️ Functional component
const NewsPage: React.FC<PropsT> = async ({ searchParams }) => {
  const params = await searchParams;

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key] = params[key].join(',');
    }
  }

  const key = [
    params.searchString ?? '',
    params.language ?? '',
    params.sources ?? '',
    params.categories ?? '',
  ].join('|');

  return (
    <NewsPageContext key={key} urlParams={params}>
      <NewsPageWrapper />
    </NewsPageContext>
  );
};
export default NewsPage;
