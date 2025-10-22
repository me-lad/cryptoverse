// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useMemo,
} from 'react';

// 📦 Internal imports
import type { NewsContextT } from '~types/news';
import { newsContextInitialState } from '~constants/news';
import { updateSearchParams } from '~helpers/generators';
import { newsReducer } from './news.reducer';
import { createNewsActions } from './news.actions';
import { buildSearchSource } from './local';

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
  const hasMounted = useRef(false);
  const [state, dispatch] = useReducer(newsReducer, {
    data: { ...newsContextInitialState.data },
    params: {
      ...urlParams,
    },
  });

  useEffect(() => {
    if (hasMounted.current) {
      const { language, sources, searchString, ...rest } = state.params;
      updateSearchParams({
        ...rest,
        searchString,
        language: language !== 'EN' ? language : undefined,
        sources: !searchString ? sources : buildSearchSource(sources),
      });
    } else {
      hasMounted.current = true;
    }
  }, [state.params]);

  const actions = useMemo(() => createNewsActions(dispatch), [dispatch]);

  return <NewsContext value={{ ...state, actions }}>{children}</NewsContext>;
};
export default NewsPageContext;
