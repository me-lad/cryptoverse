// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useEffect, useReducer, useMemo } from 'react';

// 📦 Internal imports
import type { NewsContextT } from '~types/news';
import { updateSearchParams } from '~helpers/generators';
import { newsReducer } from './news.reducer';
import { createNewsActions } from './news.actions';
import { buildSearchSource } from './local';
import { useHasMounted } from '~hooks/useHasMounted';

// 🧾 Local types and variables
const initialState: NewsContextT = {
  data: {
    news: [],
    searchedNews: [],
    sources: [],
    categories: [],
  },

  params: {
    language: 'EN',
  },
};

export const NewsContext = createContext<NewsContextT>(initialState);

interface PropsT {
  children: React.ReactNode;
  urlParams: {
    [key: string]: string | undefined;
  };
}

// ⚙️ Functional component
const NewsPageContext: React.FC<PropsT> = ({ urlParams, children }) => {
  const [state, dispatch] = useReducer(newsReducer, {
    data: { ...initialState.data },
    params: {
      ...urlParams,
    },
  });

  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const { language, sources, searchString, ...rest } = state.params;
      updateSearchParams({
        ...rest,
        searchString,
        language: language !== 'EN' ? language : undefined,
        sources: !searchString ? sources : buildSearchSource(sources),
      });
    }
  }, [state.params]);

  const actions = useMemo(() => createNewsActions(dispatch), [dispatch]);

  return <NewsContext value={{ ...state, actions }}>{children}</NewsContext>;
};
export default NewsPageContext;
