// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Spinner } from '~core/ui/shadcn/spinner';

// 📦 Internal imports
import { CatchError } from '~core/ui/shared/typography';
import { NewsContext } from '../NewsPage.context';
import { useInfiniteScroll, useNewsQuery } from './local';
import NewsListUi, { NewsLoading } from './NewsList.ui';

// ⚙️ Functional component
const NewsListFn = () => {
  const { data: contextData, params, actions } = use(NewsContext);
  const { data, isLoading, isError, error } = useNewsQuery();
  const {
    scrollFetchTimes,
    isFetchingOnScroll,
    fetchOlderNews,
    setScrollFetchTimes,
    hasScrollFinished,
  } = useInfiniteScroll();

  useEffect(() => {
    if (actions?.setNewsList && actions.setSearchedNewsList) {
      if (params.searchString && data?.Data) {
        actions.setSearchedNewsList(data?.Data || []);
      } else {
        actions.setNewsList(data?.Data || contextData.news);
      }
    }
  }, [data?.Data, params.searchString]);

  if (isLoading) {
    return <NewsLoading />;
  }
  if (isError) {
    return (
      <CatchError
        className="mt-20"
        message={
          (error.message.includes('"type":1,') &&
            'No article found with given filters or search string.') ||
          ''
        }
      />
    );
  }

  return (
    <>
      <NewsListUi
        news={
          contextData.searchedNews.length
            ? contextData.searchedNews
            : contextData.news
        }
      />
      {!!scrollFetchTimes && !hasScrollFinished.current ? (
        <Button
          onClick={() => {
            fetchOlderNews().then(() => setScrollFetchTimes(0));
          }}
          className="mx-auto mt-20 flex cursor-pointer justify-center"
          disabled={isFetchingOnScroll}
          variant="outline"
          size="lg"
        >
          {isFetchingOnScroll ? 'Loading ...' : 'Load More News'}
        </Button>
      ) : (
        isFetchingOnScroll && (
          <Spinner
            className="mt-20 flex w-full justify-center text-center"
            size={40}
            variant="ellipsis"
          />
        )
      )}
    </>
  );
};
export default NewsListFn;
