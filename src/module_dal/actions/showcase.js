import _ from 'lodash';

import {LookServices} from '../services/look_services';
import {NewsServices} from '../services/news_services';
import {TagsServices} from '../services/tags_services';
import {ShowcaseServices} from '../services/showcase_services';
import {ArticleServices} from '../services/article_services';
import {RubricServices} from '../services/rubric_services';


import {
    SET_TITLE_SHOWCASE,
    actionGetSectionShowcase,
    actionLoadMoreSectionShowcase
} from './actions';


/**
 * получаем витрины детальной страницы статьи
 */
export const getArticleDetailShowcase = () => dispatch => {
  return ArticleServices.getArticleDetailShowcase()
      .then((data)=> {
        setShowcaseTitle(data, dispatch);
        Promise.all(getShowCases(data, {spage1: 5, spage2: 3}))
            .then(data => {
              dispatch(actionGetSectionShowcase({
                section: 'articles_detail',
                data
              }))
            })
      })
      .catch(failLoadContent);
}

/**
 * витрины главной страницы сайта
 */
export const getShowcaseIndex = () => dispatch => {
  return ShowcaseServices.getSectionsFamily()
      .then((data)=> {
        setShowcaseTitle(data, dispatch);
        Promise.all(getShowCases(data, {spage1: 6, spage2: 7}))
            .then(data => {
              dispatch(actionGetSectionShowcase({
                section: 'index',
                data
              }))
            })
      })
      .catch(failLoadContent);
}

export const getNewsShowcases = () => dispatch => {
  return NewsServices.getNewsSections()
      .then((data)=> {
        setShowcaseTitle(data, dispatch);
        Promise.all(getShowCases(data, {spage1: 5, spage2: 4}))
            .then(data => {
              dispatch(actionGetSectionShowcase({
                section: 'news_list',
                data
              }))
            })

      })
      .catch(failLoadContent);
}

export const getNewsDetailShowcase = () => dispatch => {
  return NewsServices.getNewsDetailShowcase()
      .then((data)=> {
        setShowcaseTitle(data, dispatch);
        Promise.all(getShowCases(data, {spage1: 5, spage2: 3}))
            .then(data => {
              dispatch(actionGetSectionShowcase({
                section: 'news_list',
                data
              }))
            })
      })
      .catch(failLoadContent);
}

export const fetchNewsRubricShowcases = () => dispatch => {
  return NewsServices.getNewsRubricSections()
      .then((data)=> {
        setShowcaseTitle(data, dispatch);
        Promise.all(getShowCases(data, {spage1: 5, spage2: 4}))
            .then(data => {
              dispatch(actionGetSectionShowcase({
                section: 'news_list',
                data
              }))
            })

      })
      .catch(failLoadContent);
}


/**
 * Подгрузка витрины по скроллингу
 * запрашиваем весь контент витрины - передаем slug
 * Метод срабатывает всего один раз, после успешной загрузки отписываемся от скроллинга
 *
 * берем первые 6 загруженных блоков и добавляем новые -(минус) 6
 *
 * @param slug
 */
export const loadMoreShowcase = (slug, countSlice) => dispatch => {
  return ShowcaseServices.getShowcaseBySlugAll(slug)
      .then(data => {
        dispatch(actionLoadMoreSectionShowcase({
          section: 'index',
          data,
          countSlice
        }))
      })
      .catch(failLoadContent)
}


/**
 * заголовок второго слота
 * @param data
 * @param dispatch
 */
function setShowcaseTitle(data, dispatch) {
  let {slots} = data.item;
  if (slots && slots.length && slots[1] && slots[1].showcase) {
    dispatch({type: SET_TITLE_SHOWCASE, title: slots[1].showcase.title})
  }
}

/**
 * Если в showcase поле contents не пустое и ссылка
 * то загружаем данные по ветрине отдельно
 *
 * page_size - говорим какое количество блоков нам нужно
 * по дефолту 8, для второй витрины 6
 *
 * Если данные по ветрине пришли сразу, то отрисовываем
 * возврящаем массив промисов
 * @param data
 * @returns {Array}
 */
function getShowCases(data, spage) {

  var slots                 = data.item.slots;
  let loadCollectionPromise = [];
  let page_size             = 8;

  slots.forEach((val, index) => {
    if (val.showcase == null) return;
    if (typeof val.showcase.contents === 'string') {
      page_size = (index == 1) ? spage.spage1 : spage.spage2;
      loadCollectionPromise.push(loadShowCases(val.showcase, page_size))
    } else {
      loadCollectionPromise.push(wrapPromise(val.showcase.contents))
    }
  });

  return loadCollectionPromise;
}


/**
 * загрузка витрины по url
 * @param value
 * @param page_size
 * @returns {Promise}
 */
function loadShowCases(value, page_size) {
  return new Promise((resolve, reject)=> {
    let params = {
      url: value.contents,
      params: {page_size: page_size}
    };

    ShowcaseServices.getShowcaseByUrl(params)
        .then(resolve)
        .catch(reject)
  })
}


/**
 * просто оборачиваем в промис
 * @param data
 * @returns {Promise}
 */
function wrapPromise(data) {
  return new Promise((resolve, reject)=> {
    resolve(data);
  })
}

function failLoadContent() {
  console.warn('error load');
}
