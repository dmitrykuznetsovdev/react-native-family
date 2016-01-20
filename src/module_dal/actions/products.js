import _ from 'lodash';
import {ProductServices} from '_services/product_services';


import {
    PRODUCTS_FILTERED,
    PRODUCTS_SORT,
    PRODUCTS_LOAD_MORE,
    PRODUCTS_LOADER,
    PRODUCTS_CHOOSE_CATEGORY,
    PRODUCTS_CHOOSE_SUB_CATEGORY,
    actionGetCategoriesProducts,
    actionGetListProducts,
    actionAppendListProducts
} from './actions';

export const getCategoriesProducts = () => dispatch => {
  dispatch({type: PRODUCTS_LOADER, show: true});
  return ProductServices.getCategoriesProducts({page_size: 100})
      .then((data)=> {
        dispatch({
          type: PRODUCTS_LOADER,
          show: false
        });
        return dispatch(actionGetCategoriesProducts(data))
      })
      .catch(failLoadContentHide.bind(this, dispatch))
}


export const getListProducts = (dataFilter) => dispatch => {
  dispatch({type: PRODUCTS_LOADER, show: true});
  return getProducts(dataFilter)
      .then((data)=> {
        dispatch({
          type: PRODUCTS_LOADER,
          show: false
        });
        return dispatch(actionGetListProducts(data))
      })
      .catch(failLoadContentHide.bind(this, dispatch))
}


/**
 * загрузка товаров после выбора категории
 * @param dataFilter
 * @param opt_param
 */
export const chooseProductsCategories = (dataFilter, opt_param) => dispatch => {
  let ACTION_CHOOSE = !opt_param ? PRODUCTS_CHOOSE_CATEGORY : PRODUCTS_CHOOSE_SUB_CATEGORY;

  dispatch({ type: PRODUCTS_LOADER, show: true });

  dispatch({
    type: ACTION_CHOOSE,
    category: dataFilter.category,
    parentId: opt_param ? dataFilter.parentId : null
  });

  return getProducts(dataFilter)
      .then((data)=> {
        dispatch({type: PRODUCTS_LOADER, show: false });
        return dispatch(actionGetListProducts(data))
      })
      .catch(failLoadContentHide.bind(this, dispatch))
}

/**
 * фильтрация по цене
 * @param dataFilter
 * @param opt_param
 */
export const filterProducts = (dataFilter) => dispatch => {
  dispatch({ type: PRODUCTS_LOADER, show: true });
  dispatch({ type: PRODUCTS_FILTERED, data : dataFilter });

  return getProducts(dataFilter)
      .then((data)=> {
        dispatch({ type: PRODUCTS_LOADER, show: false });
        return dispatch(actionGetListProducts(data))
      })
      .catch(failLoadContentHide.bind(this, dispatch))
}


/**
 * загрузка товаров по url
 * метод работает только для пагинации по скроллу
 * url приходит в ответе по товарам - page
 */
export const loadMoreProducts = (pageNext) => dispatch => {
  return ProductServices.getProductsByUrl(pageNext)
      .then((data)=> dispatch(actionAppendListProducts(data)))
      .catch(failLoadContentHide.bind(this, dispatch))
}


function getProducts(dataFilter) {
  return ProductServices.getProducts({...dataFilter})
}

function failLoadContentHide(dispatch) {
  dispatch({type: PRODUCTS_LOADER, show: false});
  console.warn('error load');
}

function failLoadContent() {
  console.warn('error load');
}
