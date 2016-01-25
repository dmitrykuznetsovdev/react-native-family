export const GET_UNIQUE_NEWS_CONTENT = 'GET_UNIQUE_NEWS_CONTENT';
export const GET_SECTION_SHOWCASE    = 'GET_SECTION_SHOWCASE';
export const APPEND_SECTION_SHOWCASE = 'APPEND_SECTION_SHOWCASE';

export const SET_TAG_BY_SLUG    = 'SET_TAG_BY_SLUG';
export const SET_TITLE_SHOWCASE = 'SET_TITLE_SHOWCASE';

export const GET_ARTICLES                   = 'GET_ARTICLES';
export const GET_ARTICLES_BY_RUBRIC         = 'GET_ARTICLES_BY_RUBRIC';
export const GET_ARTICLES_BY_RUBRIC_NO_PART = 'GET_ARTICLES_BY_RUBRIC_NO_PART';
export const GET_ARTICLES_RUBRIC_INFO       = 'GET_ARTICLES_RUBRIC_INFO';
export const GET_ARTICLES_MORE              = 'GET_ARTICLES_MORE';
export const GET_ARTICLE_DETAIL             = 'GET_ARTICLE_DETAIL';
export const GET_ARTICLE_DETAIL_RELATED     = 'GET_ARTICLE_DETAIL_RELATED';
export const ARTICLES_SHOW_LOADER           = 'ARTICLES_SHOW_LOADER';

export const GET_NEWS_LIST           = 'GET_NEWS_LIST';
export const GET_NEWS_DETAIL         = 'GET_NEWS_DETAIL';
export const GET_NEWS_DETAIL_RELATED = 'GET_NEWS_DETAIL_RELATED';
export const GET_NEWS_BY_RUBRIC      = 'GET_NEWS_BY_RUBRIC';
export const GET_NEWS_RUBRIC_INFO    = 'GET_NEWS_RUBRIC_INFO';
export const GET_LOOKS               = 'GET_LOOKS';
export const GET_LOOKS_BY_SLUG       = 'GET_LOOKS_BY_SLUG';

export const LOOK_SELECTED       = 'LOOK_SELECTED';
export const LOOK_UN_SELECTED    = 'LOOK_UN_SELECTED';
export const LOOKS_IMAGE_SIZE    = 'LOOKS_IMAGE_SIZE';
export const SET_ACTIVE_LOOK     = 'SET_ACTIVE_LOOK';
export const FILTER_EXCLUDE_LOOK = 'FILTER_EXCLUDE_LOOK';


export const GET_CHECKLIST_RANDOM          = 'GET_CHECKLIST_RANDOM';
export const GET_LIST_OF_CHECKLISTS        = 'GET_LIST_OF_CHECKLISTS';
export const GET_CHECKLIST_OF_SLUG         = 'GET_CHECKLIST_OF_SLUG';
export const GET_SHARED_CHECKLIST          = 'GET_SHARED_CHECKLIST';
export const CHECKLIST_DELETE              = 'CHECKLIST_DELETE';
export const CHECKLIST_TOGGLE_ACTIVE       = 'CHECKLIST_TOGGLE_ACTIVE';
export const CHECKLIST_PRODUCT_ADD         = 'CHECKLIST_PRODUCT_ADD';
export const CHECKLIST_PRODUCT_REMOVE      = 'CHECKLIST_PRODUCT_REMOVE';
export const CHECKLIST_MODAL               = 'CHECKLIST_MODAL';
export const CHECKLIST_CHANGE_GENDER       = 'CHECKLIST_CHANGE_GENDER';
export const CHECKLIST_SUBCATEGORY_CHECKED = 'CHECKLIST_SUBCATEGORY_CHECKED';
export const CHECKLIST_SUBCATEGORY_CHOOSE  = 'CHECKLIST_SUBCATEGORY_CHOOSE';
export const CHECKLIST_CATEGORY_CHOOSE     = 'CHECKLIST_CATEGORY_CHOOSE';
export const GET_CHECKLIST_PREVIEW         = 'GET_CHECKLIST_PREVIEW';
export const CHECKLIST_LOADER              = 'CHECKLIST_LOADER';
export const CHECKLIST_LOADER_PRODUCTS     = 'CHECKLIST_LOADER_PRODUCTS';


export const HEADER_MOUSEOVER        = 'HEADER_MOUSEOVER';
export const HEADER_MOUSEOUT         = 'HEADER_MOUSEOUT';
export const HEADER_SUBMENU_SHOW     = 'HEADER_SUBMENU_SHOW';
export const HEADER_SUBMENU_HIDE     = 'HEADER_SUBMENU_HIDE';
export const HEADER_SUBMENU_SET_TYPE = 'HEADER_SUBMENU_SET_TYPE';
export const HEADER_SET_DATA         = 'HEADER_SET_DATA';


export const MENU_TOGGLE_ACTIVE     = 'MENU_TOGGLE_ACTIVE';
export const MENU_SET_TYPE          = 'MENU_SET_TYPE';
export const MENU_SET_SUBMENU_TOUCH = 'MENU_SET_SUBMENU_TOUCH';

export const SET_SECTION_FOOTER_TEXT = 'SET_SECTION_FOOTER_TEXT';

export const PRODUCTS_GET_CATEGORIES      = 'PRODUCTS_GET_CATEGORIES';
export const PRODUCTS_GET_LIST            = 'PRODUCTS_GET_LIST';
export const PRODUCTS_LOAD_MORE           = 'PRODUCTS_LOAD_MORE';
export const PRODUCTS_CHOOSE_CATEGORY     = 'PRODUCTS_CHOOSE_CATEGORY';
export const PRODUCTS_CHOOSE_SUB_CATEGORY = 'PRODUCTS_CHOOSE_SUB_CATEGORY';
export const PRODUCTS_FILTERED            = 'PRODUCTS_FILTERED';
export const PRODUCTS_SORT                = 'PRODUCTS_SORT';
export const PRODUCTS_LOADER              = 'PRODUCTS_LOADER';
export const PRODUCTS_MODAL               = 'PRODUCTS_MODAL';

export const SEARCH_GET_TABS          = 'SEARCH_GET_TABS';
export const SEARCH_GET_DATA_BY_QUERY = 'SEARCH_GET_DATA_BY_QUERY';
export const SEARCH_GET_DATA_BY_TABS  = 'SEARCH_GET_DATA_BY_TABS';
export const SEARCH_GET_DATA_BY_PAGE  = 'SEARCH_GET_DATA_BY_PAGE';
export const SEARCH_LOADER            = 'SEARCH_LOADER';
export const SEARCH_GET_PREDICATES    = 'SEARCH_GET_PREDICATES';
export const SEARCH_RESET_PREDICATES  = 'SEARCH_RESET_PREDICATES';
export const SEARCH_SHOW_FIELD        = 'SEARCH_SHOW_FIELD';

export const OVERLAY_SHOW = 'OVERLAY_SHOW';

export const CHANGE_MEDIA_QUERY = 'CHANGE_MEDIA_QUERY';


/**
 *
 * @param section
 * @param data
 * @returns {{type: string, section: *, data: *}}
 */
export function actionGetSectionShowcase({section, data}) {
  return {
    type: GET_SECTION_SHOWCASE,
    section,
    data
  };
}

/**
 *
 * @param section
 * @param data
 * @param countSlice
 * @returns {{type: string, section: *, data: *, countSlice: *}}
 */
export function actionLoadMoreSectionShowcase({section, data, countSlice}) {
  return {
    type: APPEND_SECTION_SHOWCASE,
    section,
    data,
    countSlice
  };
}

/**
 * теги
 * формируем объект slug = data
 * @param slug
 * @param data
 * @returns {{type: string, slug: *, data: {}}}
 */
export function actionTagsBySlug({slug, data}) {
  let dataSlug   = {};
  dataSlug[slug] = {...data};
  return {
    type: SET_TAG_BY_SLUG,
    slug,
    data: dataSlug
  };
}


/**
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export function actionArticlesByRubric(data) {
  return {
    type: GET_ARTICLES_BY_RUBRIC,
    data
  };
}

/**
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export function actionGetCategoriesProducts(data) {
  return {
    type: PRODUCTS_GET_CATEGORIES,
    data
  };
}

/**
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export function actionGetListProducts(data) {
  return {
    type: PRODUCTS_GET_LIST,
    data
  };
}

/**
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export function actionAppendListProducts(data) {
  return {
    type: PRODUCTS_LOAD_MORE,
    data
  };
}
