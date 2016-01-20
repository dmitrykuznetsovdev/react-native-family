import _ from 'lodash';

import {CheckListServices} from '_services/check_list_services';
import {
    GET_CHECKLIST_RANDOM,
    GET_LIST_OF_CHECKLISTS,
    CHECKLIST_LOADER,
    CHECKLIST_LOADER_PRODUCTS,
    GET_CHECKLIST_OF_SLUG,
    GET_SHARED_CHECKLIST,
    GET_CHECKLIST_PREVIEW
} from './actions';

let _fetchPreview = null;

export const getCheckByPage = () => dispatch => {
  return CheckListServices.getCheckByPage()
      .then((data)=>
          dispatch({type: GET_CHECKLIST_RANDOM, data})
      )
      .catch(failLoadContent);
}

/**
 * список чеклистов на странице - /sovet/cheklisti/
 */
export const getListOfCheckLists = () => dispatch => {
  return CheckListServices.getTemplates()
      .then((data)=>
          dispatch({type: GET_LIST_OF_CHECKLISTS, items: data.items})
      )
      .catch(failLoadContent);
}


/**
 * Загружаем чек-лист по слагу
 * Грузим товары первой подкатегории в первой категории
 *
 * @param slug
 */
export const getCheckListOfSlug = (slug) => dispatch => {
  dispatch({type: CHECKLIST_LOADER, loader: true})

  return CheckListServices.getChecklists(slug)
      .then((data)=> {
        const subCat = findSubCategory(data);
        if (subCat) {
          return getChecklistsPreview(subCat.products_link)
              .then((dataPreview)=> {
                const preview = dataPreview.items.shuffle().slice(0, 4);
                data.item.products = preview;
                data.item.categories[0].items[0].products = preview;

                dispatch({type: CHECKLIST_LOADER, loader: false})
                return dispatch({type: GET_CHECKLIST_OF_SLUG, checklist: data})
              })
        } else {
          dispatch({type: CHECKLIST_LOADER, loader: false})
          return dispatch({type: GET_CHECKLIST_OF_SLUG, checklist: data})
        }
      })
      .catch(()=> {
        dispatch({type: CHECKLIST_LOADER, loader: false})
      })
}

/**
 * Загружаем пользовательский чек-лист при переходе из почты
 * @param hash
 */
export const getShareChecklist = (hash) => dispatch => {
  let checklist = null;

  dispatch({type: CHECKLIST_LOADER, loader: true})

  return CheckListServices.getShareChecklist(hash)
      .then((data)=> {
        dispatch({type: CHECKLIST_LOADER, loader: false})
        if (data.item) {
          //checklist = JSON.parse(data.item.value);
        }
        return dispatch({type: GET_SHARED_CHECKLIST, checklist})
      })
      .catch(()=> {
        dispatch({type: CHECKLIST_LOADER, loader: false});
      })
}


export const shareChecklist = (checklistData) => dispatch => {
  dispatch({type: CHECKLIST_LOADER, loader: true})
  return CheckListServices.shareChecklist(checklistData)
      .then((data)=> dispatch({type: CHECKLIST_LOADER, loader: false}))
      .catch(()=> dispatch({type: CHECKLIST_LOADER, loader: false}))
}

function findSubCategory(data) {
  if (data.item.categories && data.item.categories.length) {
    return data.item.categories[0].items[0];
  }
}

/**
 * загружаем товары подкатегории
 * привязываем к конкретному чеклисту и его категории
 *
 * даже если мы переключили чек-лист раньше чем завершился запрос за товарами
 * находим его и добавляем товары
 *
 * @param params
 */
export const getChecklistsPreviewByUrl = (params) => dispatch => {

  dispatch({type: CHECKLIST_LOADER_PRODUCTS, loader: true})
  return getChecklistsPreview(params.url)
      .then((data)=> {
        dispatch({type: CHECKLIST_LOADER_PRODUCTS, loader: false})
        return dispatch({
          type: GET_CHECKLIST_PREVIEW,
          items: data.items.shuffle().slice(0, 4),
          params: {...params}
        })
      })
      .catch(()=> {
        dispatch({type: CHECKLIST_LOADER_PRODUCTS, loader: false})
      })
}

function getChecklistsPreview(url) {
  return CheckListServices.getChecklistsPreviewByUrl(url)
}

function failLoadContent() {
  console.warn('error load');
}


