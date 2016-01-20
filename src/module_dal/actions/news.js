import _ from 'lodash';

import {NewsServices} from '_services/news_services';
import {TagsServices} from '_services/tags_services';
import {ShowcaseServices} from '_services/showcase_services';
import {RubricServices} from '_services/rubric_services';

import {
    GET_UNIQUE_NEWS_CONTENT,
    GET_NEWS_LIST,
    GET_NEWS_DETAIL,
    GET_NEWS_DETAIL_RELATED,
    GET_NEWS_BY_RUBRIC
} from './actions';


/**
 * получаем уникальные новости
 */
export const getUniqNews = (page_size) => dispatch => {
  return NewsServices.getUniqNewsContent(page_size)
      .then(data =>
          dispatch({type: GET_UNIQUE_NEWS_CONTENT, data})
      )
      .catch(failLoadContent);
}

/**
 * список новостей
 * @param params
 */
export const fetchNews = (page = 1, rubric = '') => dispatch => {
  return NewsServices.getNewsContent(page, rubric)
      .then((data)=>
          dispatch({type: GET_NEWS_LIST, data})
      )
      .catch(failLoadContent);
}

/**
 * детальная новости
 * @param id
 */
export const getNewsById = (id) => dispatch => {
  return NewsServices.getNewsId(id)
      .then((data)=>
          dispatch({type: GET_NEWS_DETAIL, data})
      )
      .catch(failLoadContent);
}

export const getNewsRelated = (id) => dispatch => {
  NewsServices.getNewsRelated(id)
      .then((data)=>
          dispatch({type: GET_NEWS_DETAIL_RELATED, data})
      )
      .catch(failLoadContent);
}

export const fetchNewsByRubric = (id) => dispatch => {
  NewsServices.getNewsContentByRubric(id)
      .then((data)=>
          dispatch({type: GET_NEWS_BY_RUBRIC, data})
      )
      .catch(failLoadContent);
}

function failLoadContent() {
  console.warn('error load');
}
