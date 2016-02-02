import _ from 'lodash';
import {SearchServices} from '_services/search_services';


import {
    SEARCH_GET_TABS,
    SEARCH_GET_DATA_BY_QUERY,
    SEARCH_GET_DATA_BY_TABS,
    SEARCH_GET_DATA_BY_PAGE,
    SEARCH_GET_PREDICATES,
    SEARCH_LOADER,
    SEARCH_MORE
} from './actions';


/**
 * список статей
 */
export const fetchTabs = (query, tab) => dispatch => {
  return SearchServices.getSearchTabs(query)
      .then((data)=>
          dispatch({type: SEARCH_GET_TABS, data, tab})
      )
      .catch(failLoadContent.bind(this, dispatch))
}

/**
 * список статей по рубрикам и данные самой рубрики
 * @param rubricId
 */
export const fetchSearchQuery = (tab, query) => dispatch => {

  let data_query = {
    tab: tab || 'content',
    query: query || ''
  }

  dispatch({type: SEARCH_LOADER, loader : true})

  return SearchServices.getContentByType(data_query.tab, data_query.query)
      .then((data)=> {
        return dispatch({
          type: SEARCH_GET_DATA_BY_QUERY,
          query : data_query.query,
          tab : data_query.tab,
          data
        })
      })
      .catch(failLoadContent.bind(this, dispatch))
}


export const fetchContentByTypeTabs = (url, tab) => dispatch => {

  dispatch({type: SEARCH_LOADER, loader : true})

  return SearchServices.getSearchByUrl(url)
      .then((data)=> {
        return dispatch({type: SEARCH_GET_DATA_BY_TABS, data, tab})
      })
      .catch(failLoadContent.bind(this, dispatch))
}

export const fetchMoreNews = (url) => dispatch => {
  return SearchServices.getSearchByUrl(url)
      .then((data)=>
        dispatch({type: SEARCH_MORE, data})
      )
      .catch(failLoadContent.bind(this, dispatch))
}


export const fetchDataByPage = (tab, query, page) => dispatch => {

  dispatch({type: SEARCH_LOADER, loader : true})

  return SearchServices.getSearchByPage(tab, query, page)
      .then((data)=> {
        return dispatch({type: SEARCH_GET_DATA_BY_PAGE, data})
      })
      .catch(failLoadContent.bind(this, dispatch))
}


export const getPredicates = (query, contentType) => dispatch => {
  return SearchServices.getPredicates(query, contentType)
      .then((data) =>
          dispatch({type: SEARCH_GET_PREDICATES, items : data.items})
      )
}


function failLoadContent(dispatch) {
  dispatch({type: SEARCH_LOADER, loader : false})
  console.warn('error load');
}
