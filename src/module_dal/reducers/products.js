import urlFormater from 'url';
import path from 'path';

import {
    PRODUCTS_GET_CATEGORIES,
    PRODUCTS_GET_LIST,
    PRODUCTS_LOAD_MORE,
    PRODUCTS_CHOOSE_CATEGORY,
    PRODUCTS_CHOOSE_SUB_CATEGORY,
    PRODUCTS_FILTERED,
    PRODUCTS_SORT,
    PRODUCTS_LOADER,
    PRODUCTS_MODAL
} from '_actions/actions';


/**
 * Если перешли по url с категорией
 * @param categories
 * @returns {*}
 */
function firstSetActiveCategory(categories) {
  let newCategories = [...categories];
  const { query } =  urlFormater.parse('', true);
  let isQuery = Object.keys(query).length;
  if (isQuery && query.category) {
    return setActiveCategoryById(newCategories, query.category);
  } else {
    return newCategories
  }
}

/**
 * пройтись по всем категориям, сделать активную
 * сбросить остальные
 *
 * так же смотрим на subcategories
 * так как id категории в параметрах url может быть id подкатегории
 *
 * @param categories
 * @param id
 * @returns {*}
 */
function setActiveCategoryById(categories, id) {
  categories.forEach((item, i)=> {
    if (item.id == id) {
      item.active = true;
    }
    else {
      item.active = findSubCategoryById(item, id)
          ? true : false;
    }
  })
  return categories;
}

function findSubCategoryById(category, id) {
  let cat = {...category};
  if(cat.subcategories.length) {
    return cat.subcategories.find(item => {
      if(item.id == id){
        item.active = true;
        return item;
      }
    });
  }
}


/**
 * делаем категорию активной
 * @param categories
 * @param id
 * @returns {Array.<T>}
 */
function setActiveCategory(categories, id) {
  let cat = [...categories];
  return cat.filter((item)=> {
    item.active = item.id == id ? true : false;
    return true;
  })
}

/**
 * находим подкатегории по id ролительской категории
 * @param categories
 * @param id
 * @param parentId
 * @returns {Array}
 */
function setActiveSubCategory(categories, id, parentId) {
  let cat = [...categories];
  cat.every((item)=> {
    if(item.id == parentId){
      item.subcategories.forEach((sub)=>{
          sub.active = (sub.id == id) ? true : false;
      })
      return true;
    }
  })

  return cat;
}

/**
 * изменяем параметры в url
 * @param opt_id
 * @private
 */
function _changeUrlByFilters(productId, modal = false, filters) {
  const { query } =  urlFormater.parse('', true);

  let urlParams = {
    ...query,
    ...filters,
    id: productId,
    modal: modal
  };
}

const products = (state = {
  categories: {
    items: []
  },
  products_list: {
    items: []
  },
  filters: {
    min_price: 0,
    max_price: 500000,
    category : null,
    popular : true,
    page: 1
  },
  pageNext : '',
  sort: {},
  loader : true,
  modal : false,
  productId : null
}, action) => {
  switch (action.type) {
    case PRODUCTS_GET_CATEGORIES:
      _changeUrlByFilters(0, false, state.filters)
      return {
        ...state,
        categories: {
          ...state.categories,
          items : firstSetActiveCategory(action.data.items)
        }
      }
    case PRODUCTS_GET_LIST:
      return {
        ...state,
        pageNext : action.data.page.next,
        products_list: {...action.data}
      }
    case PRODUCTS_LOAD_MORE:
      const list = [].concat(state.products_list.items, action.data.items);
      return {
        ...state,
        pageNext : action.data.page.next,
        products_list: {
          ...state.products_list,
          items: list
        }
      }
    case PRODUCTS_CHOOSE_CATEGORY:
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.category,
          popular : false
        },
        categories: {
          ...state.categories,
          items: setActiveCategory(state.categories.items, action.category)
        }
      }
    case PRODUCTS_CHOOSE_SUB_CATEGORY:
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.category,
          popular : false
        },
        categories: {
          ...state.categories,
          items: setActiveSubCategory(state.categories.items, action.category, action.parentId)
        }
      }
    case PRODUCTS_FILTERED:
      _changeUrlByFilters(
          0, false, {...state.filters, ...action.data}
      )
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.data,
          popular: state.filters.category ? false : true
        }
      }
    case PRODUCTS_SORT:
      return {
        ...state,
        sort: {...action.data}
      }
    case PRODUCTS_LOADER:
      return {
        ...state,
        loader: action.show
      }
    case PRODUCTS_MODAL:
      const id = action.productId;
      _changeUrlByFilters(
          id, action.modalShow, state.filters
      )
      return {
        ...state,
        modal: action.modalShow,
        productId: id
      }
    default:
      return {...state}
  }
}


export default products;
