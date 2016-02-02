import _ from 'lodash';

import {LookServices} from '../services/look_services';
import {NewsServices} from '../services/news_services';
import {TagsServices} from '../services/tags_services';
import {ShowcaseServices} from '../services/showcase_services';
import {ArticleServices} from '../services/article_services';
import {RubricServices} from '../services/rubric_services';

import {
    GET_UNIQUE_NEWS_CONTENT,
    GET_LOOKS,
    SET_TITLE_SHOWCASE,
    GET_NEWS_RUBRIC_INFO,
    GET_LOOKS_BY_SLUG,
    actionTagsBySlug
} from './actions';


/**
 * получаем луки
 */
export const getLooks = (page_size) => dispatch => {
  return LookServices.getLooks(page_size)
      .then((data) => dispatch({type: GET_LOOKS, data}))
      .catch(failLoadContent);
}

export const getLookBySlug = (slug) => dispatch => {
  return LookServices.getLookBySlug(slug)
      .then((data) => dispatch({type: GET_LOOKS_BY_SLUG, data: data.item}))
      .catch(failLoadContent);
}


/**
 * получаем рубрики по типу контента и по id
 * @param type
 * @param id
 */
export const getRubricsBySlug = (type, id) => dispatch => {
  let action_type = `GET_${type.toUpperCase()}_RUBRIC_INFO`;

  return RubricServices.getRubricsBySlug(type, id)
      .then((data) => dispatch({type: action_type, data}))
      .catch(failLoadContent);
}

/**
 * теги по слагу
 * @param slug
 */
export const getTagsBySlug = (slug) => dispatch => {
  return TagsServices.getTagsBySlug(slug)
      .then((data) => dispatch(actionTagsBySlug({slug, data})))
      .catch(failLoadContent);
}


function failLoadContent() {
  console.warn('error load');
}

