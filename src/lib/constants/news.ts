import type { NewsContextT } from '~types/news';

export const NewsReducerActions = {
  SetNewsList: 'SetNewsList',
  SetSearchedNewsList: 'SetSearchedNewsList',
  SetSourcesList: 'SetSourcesList',
  SetCategoriesList: 'SetCategoriesList',
  SetLanguageParam: 'SetLanguageParam',
  SetSourcesParam: 'SetSourcesParam',
  SetCategoriesParam: 'SetCategoriesParam',
  SetExcludeCategoriesParam: 'SetExcludeCategoriesParam',
  SetSearchStringParam: 'SetSearchStringParam',
  SetSearchSourceParam: 'SetSearchSourceParam',
} as const;

export const newsContextInitialState: NewsContextT = {
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
