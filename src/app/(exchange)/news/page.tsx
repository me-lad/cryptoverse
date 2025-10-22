// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import NewsPageWrapper from '~modules/pages/news/NewsPage.wrapper';
import NewsPageContext from '~modules/pages/news/NewsPage.context';

interface PropsT {
  searchParams: {
    [key: string]: string | undefined;
  };
}

// ⚙️ Functional component
const NewsPage: React.FC<PropsT> = async ({ searchParams }) => {
  const params = await searchParams;

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key] = params[key].join(',');
    }
  }

  return (
    <NewsPageContext urlParams={params}>
      <NewsPageWrapper />
    </NewsPageContext>
  );
};
export default NewsPage;
