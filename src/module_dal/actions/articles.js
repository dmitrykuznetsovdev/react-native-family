import _ from 'lodash';

import {LookServices} from '_services/look_services';
import {NewsServices} from '_services/news_services';
import {TagsServices} from '_services/tags_services';
import {ShowcaseServices} from '_services/showcase_services';
import {ArticleServices} from '_services/article_services';
import {RubricServices} from '_services/rubric_services';


import {
  GET_ARTICLES,
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_RELATED,
  GET_ARTICLES_MORE,
  GET_ARTICLES_BY_RUBRIC,
  GET_ARTICLES_BY_RUBRIC_NO_PART,
  ARTICLES_SHOW_LOADER,
  actionArticlesByRubric,
} from './actions';


/**
 * список статей
 */
export const fetchArticles = () => dispatch => {
  return ArticleServices.getArticles({page_size: 14})
    .then((data)=>
      dispatch({type: GET_ARTICLES, data})
    )
    .catch(failLoadContent);
}

/**
 * список статей по рубрикам и данные самой рубрики
 * @param rubricId
 */
export const fetchArticlesRubric = (rubricId) => dispatch => {
  let params = {
    rubric: rubricId,
    params: {page_size: 14}
  }

  return ArticleServices.getArticlesByRubric(params)
    .then((data)=> dispatch(actionArticlesByRubric(data)))
    .catch(failLoadContent)
}

/**
 * список статей по рубрикам и данные самой рубрики
 * @param rubricId
 */
export const fetchArticlesRubricNoPart = (rubricId, page_size = 14) => dispatch => {
  let params = {rubric: rubricId, params: {page_size}}
  return ArticleServices.getArticlesByRubric(params)
    .then((data)=>
      dispatch({type: GET_ARTICLES_BY_RUBRIC_NO_PART, data})
    )
    .catch(failLoadContent)
}

/**
 * догрузка списка статей
 * @param params
 */
export const loadMoreArticles = (params) => dispatch => {
  return ArticleServices.getArticlesByUrl(params)
    .then((data) =>
      dispatch({type: GET_ARTICLES_MORE, data})
    )
    .catch(failLoadContent);
}

/**
 * детальная страница статьи
 * @param slug
 */
export const getArticleDetail = (slug) => dispatch => {

  dispatch({type: ARTICLES_SHOW_LOADER, loader: true})

  return ArticleServices.getArticleId(slug)
    .then((data)=> {
      return dispatch({type: GET_ARTICLE_DETAIL, data})
    })
    .catch(failLoadContent);
}


export const getArticleRelated = (slug) => dispatch => {
  ArticleServices.getArticleRelated(slug)
    .then((data)=>
      dispatch({type: GET_ARTICLE_DETAIL_RELATED, data})
    )
    .catch(failLoadContent);
}

function failLoadContent() {
  console.warn('error load');
}
