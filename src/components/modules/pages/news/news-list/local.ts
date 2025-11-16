// 📌 Directives

// 📦 Third-Party imports
import { useRef, useState, useEffect, use } from 'react';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import { NewsContext } from '../NewsPage.context';
import { getNews, searchNews } from '~services/integrations/news';
import { buildSearchSource } from '../local';
import { infoToast } from '~vendors/react-toastify';

// Get news custom hook
export function useNewsQuery() {
  const { params } = use(NewsContext);

  const queryKey = [
    'news',
    params.language,
    params.sources,
    params.categories,
    params.excludeCategories,
    params.searchString,
  ];

  const queryFn = () => {
    return params.searchString
      ? searchNews(params.searchString, buildSearchSource(params.sources))
      : getNews(params);
  };

  return useQuery({ queryKey, queryFn });
}

// No more news toast
function showNoMoreNewsToast() {
  infoToast('No more news', {
    autoClose: 4000,
    position: 'top-center',
    className: 'min-w-[280px] flex justify-center !text-xl',
    closeButton: false,
    pauseOnHover: false,
  });
}

// Getting older news by scroll or user click
export function useInfiniteScroll() {
  // Context destructure
  const { data, params, actions } = use(NewsContext);

  // State declaration
  const [isFetchingOnScroll, setIsFetchingOnScroll] = useState(false);
  const [scrollFetchTimes, setScrollFetchTimes] = useState(1);
  const hasScrollFinished = useRef(false);

  // Effect that opens scroll on each parameter change
  useEffect(() => {
    hasScrollFinished.current = false;
  }, [
    params.searchString,
    params.categories,
    params.excludeCategories,
    params.language,
    params.sources,
  ]);

  // Effect that sets infinite scroll
  useEffect(() => {
    if (isFetchingOnScroll || scrollFetchTimes) return;

    const handleScroll = async () => {
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const pageHeight = document.body.offsetHeight;

      const footer = document.querySelector('footer');
      const footerHeight = footer?.clientHeight || 20;

      if (scrollPosition >= pageHeight - footerHeight) {
        await fetchOlderNews();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data.news, data.searchedNews, scrollFetchTimes]);

  // The older news fetcher function
  const fetchOlderNews = async () => {
    setIsFetchingOnScroll(true);
    try {
      const dataArray = params.searchString ? data.searchedNews : data.news;
      if (!dataArray.length) return;

      const lastTimestamp = dataArray[dataArray.length - 1].PUBLISHED_ON;

      const fetchNewsByTimestamp = async () => {
        if (params.searchString) {
          return await searchNews(
            params.searchString,
            buildSearchSource(params.sources),
            lastTimestamp,
          );
        }
        return await getNews({
          ...params,
          timestamp: lastTimestamp,
          limit: 21,
        });
      };
      const olderNews = await fetchNewsByTimestamp();

      if (olderNews.Data) {
        if (olderNews.Data.length === 1 && !hasScrollFinished.current) {
          hasScrollFinished.current = true;
          return showNoMoreNewsToast();
        }

        setScrollFetchTimes(1);

        const updatedNews = params.searchString
          ? [...data.searchedNews, ...olderNews.Data.slice(1)]
          : [...data.news, ...olderNews.Data.slice(1)];

        params.searchString
          ? actions?.setSearchedNewsList(updatedNews)
          : actions?.setNewsList(updatedNews);
      }
    } catch (err) {
      console.error('Failed to fetch older news:', err);
    } finally {
      setIsFetchingOnScroll(false);
    }
  };

  return {
    isFetchingOnScroll,
    scrollFetchTimes,
    fetchOlderNews,
    setScrollFetchTimes,
    hasScrollFinished,
  };
}
