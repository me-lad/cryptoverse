// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useEffect, useReducer, useMemo } from 'react';

// 📦 Internal imports
import type { NewsContextT } from '~types/news';
import { newsContextInitialState } from '~constants/news';
import { updateSearchParams } from '~helpers/generators';
import { newsReducer } from './news.reducer';
import { createNewsActions } from './news.actions';
import { buildSearchSource } from './local';
import { useIsMounted } from '~hooks/useIsMounted';

// 🧾 Local types and variables
export const NewsContext = createContext<NewsContextT>(newsContextInitialState);

interface PropsT {
  children: React.ReactNode;
  urlParams: {
    [key: string]: string | undefined;
  };
}

// ⚙️ Functional component
const NewsPageContext: React.FC<PropsT> = ({ urlParams, children }) => {
  const [state, dispatch] = useReducer(newsReducer, {
    data: { ...newsContextInitialState.data },
    params: {
      ...urlParams,
    },
  });

  const hasMounted = useIsMounted();

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
