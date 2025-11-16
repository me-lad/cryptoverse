import type {
  NewsContextT,
  NewsContextDataT,
  NewsContextParamsT,
  NewsReducerActionT,
} from '~types/news';
import { NewsReducerActions } from '~types/news';

export const newsReducer = (
  state: NewsContextT,
  action: NewsReducerActionT,
): NewsContextT => {
  const { type, payload } = action;

  type actionsKeysT<V> = Record<keyof typeof NewsReducerActions, keyof V>;

  const dataKeys: Partial<actionsKeysT<NewsContextDataT>> = {
    [NewsReducerActions.SetNewsList]: 'news',
    [NewsReducerActions.SetSearchedNewsList]: 'searchedNews',
    [NewsReducerActions.SetSourcesList]: 'sources',
    [NewsReducerActions.SetCategoriesList]: 'categories',
  };

  const paramKeys: Partial<actionsKeysT<NewsContextParamsT>> = {
    [NewsReducerActions.SetCategoriesParam]: 'categories',
    [NewsReducerActions.SetExcludeCategoriesParam]: 'excludeCategories',
    [NewsReducerActions.SetSourcesParam]: 'sources',
    [NewsReducerActions.SetLanguageParam]: 'language',
    [NewsReducerActions.SetSearchStringParam]: 'searchString',
  };

  if (type in dataKeys) {
    const key = dataKeys[type as keyof typeof dataKeys];
    if (!key) return state;
    return {
      ...state,
      data: { ...state.data, [key]: payload.data?.[key] || [] },
    };
  }

  if (type in paramKeys) {
    const key = paramKeys[type as keyof typeof paramKeys];
    if (!key) return state;
    return {
      ...state,
      params: { ...state.params, [key]: payload.params?.[key] ?? '' },
    };
  }

  return state;
};
