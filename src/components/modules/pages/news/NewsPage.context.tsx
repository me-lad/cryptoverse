// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useReducer, useMemo, createContext } from 'react';

// 📦 Internal imports
import type { ContextGeneralT } from '~contexts/local';
import type { NewsContextDataT, NewsContextParamsT } from '~types/news';
import { useHasMounted } from '~hooks/useHasMounted';
import { updateSearchParams } from '~helpers/generators';
import { sharedReducer } from '~contexts/index.reducer';
import { createActions } from '~contexts/index.actions';

// 🧾 Local types and helpers and context declare
interface PropsT {
  children: React.ReactNode;
  urlParams: {
    [key: string]: string | undefined;
  };
}
type NewsContextT = ContextGeneralT<NewsContextDataT, NewsContextParamsT, {}>;

const buildSearchSource = (sourcesParam?: string) => {
  return (sourcesParam || '5').split(',').slice(-1)[0];
};

const initialState: NewsContextT = {
  data: {
    news: [],
    searchedNews: [],
    categories: [],
    sources: [],
  },
  params: {},
  flags: {},
};

export const NewsContext = createContext<NewsContextT>(initialState);

// ⚙️ Functional component
const NewsPageContext: React.FC<PropsT> = ({ urlParams, children }) => {
  const [state, dispatch] = useReducer(
    sharedReducer<NewsContextDataT, NewsContextParamsT, {}>,
    { ...initialState, params: { ...urlParams } },
  );

  const hasMounted = useHasMounted();
  useEffect(() => {
    if (hasMounted && state.params) {
      const { language, sources, searchString, ...rest } = state.params;
      updateSearchParams({
        ...rest,
        searchString,
        language: language !== 'EN' ? language : undefined,
        sources: !searchString ? sources : buildSearchSource(sources),
      });
    }
  }, [state.params]);

  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  return <NewsContext value={{ ...state, actions }}>{children}</NewsContext>;
};
export default NewsPageContext;
