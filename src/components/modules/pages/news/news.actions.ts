// 📦 Third-Party imports
import type { Dispatch } from 'react';

// 📦 Internal imports
import type { NewsLanguagesT, NewsReducerActionT } from '~types/news';
import type { NewsDataEntity } from '@/lib/types/api-generated/news/getLatestNews';
import type { CategoryDataEntity } from '@/lib/types/api-generated/news/getNewsCategories';
import type { SourceDataEntity } from '@/lib/types/api-generated/news/getNewsSources';
import { NewsReducerActions } from '~types/news';

export const createNewsActions = (dispatch: Dispatch<NewsReducerActionT>) => {
  return {
    setNewsList(news: NewsDataEntity[]) {
      dispatch({
        type: NewsReducerActions.SetNewsList,
        payload: { data: { news } },
      });
    },

    setSearchedNewsList(searchedNews: NewsDataEntity[]) {
      dispatch({
        type: NewsReducerActions.SetSearchedNewsList,
        payload: { data: { searchedNews } },
      });
    },

    setSourcesList(sources: SourceDataEntity[]) {
      dispatch({
        type: NewsReducerActions.SetSourcesList,
        payload: { data: { sources } },
      });
    },

    setCategoriesList(categories: CategoryDataEntity[]) {
      dispatch({
        type: NewsReducerActions.SetCategoriesList,
        payload: { data: { categories } },
      });
    },

    setLanguageParam(language: NewsLanguagesT) {
      dispatch({
        type: NewsReducerActions.SetLanguageParam,
        payload: { params: { language } },
      });
    },

    setSourcesParam(sources: string) {
      dispatch({
        type: NewsReducerActions.SetSourcesParam,
        payload: { params: { sources } },
      });
    },

    setCategoriesParam(categories: string) {
      dispatch({
        type: NewsReducerActions.SetCategoriesParam,
        payload: { params: { categories } },
      });
    },

    setExcludeCategoriesParam(excludeCategories: string) {
      dispatch({
        type: NewsReducerActions.SetExcludeCategoriesParam,
        payload: { params: { excludeCategories } },
      });
    },

    setSearchStringParam(searchString: string) {
      dispatch({
        type: NewsReducerActions.SetSearchStringParam,
        payload: { params: { searchString } },
      });
    },
  };
};
