// 📦 Third-Party imports
import type { Dispatch } from 'react';

// 📦 Internal imports
import type { NewsLanguagesT, NewsReducerActionT } from '~types/news';
import type { DataEntity } from '~types/api-generated/getLatestNews';
import type { DataEntity as CategoryDataEntity } from '~types/api-generated/getNewsCategories';
import type { DataEntity as SourceDataEntity } from '~types/api-generated/getNewsSources';

// 🧾 Local types and variables
const NewsReducerActions = {
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

export const createNewsActions = (dispatch: Dispatch<NewsReducerActionT>) => {
  return {
    setNewsList(news: DataEntity[]) {
      dispatch({
        type: NewsReducerActions.SetNewsList,
        payload: { data: { news } },
      });
    },

    setSearchedNewsList(searchedNews: DataEntity[]) {
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
