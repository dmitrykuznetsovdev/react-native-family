import urlFormater from 'url';
import path from 'path';

import {
    SEARCH_GET_TABS,
    SEARCH_GET_DATA_BY_QUERY,
    SEARCH_GET_DATA_BY_TABS,
    SEARCH_GET_DATA_BY_PAGE,
    SEARCH_LOADER,
    SEARCH_GET_PREDICATES,
    SEARCH_RESET_PREDICATES,
    SEARCH_MORE
} from '../actions/actions';


const search = (state = {
  tabs : {
    items : []
  },
  query : {
    items : []
  },
  predicates : [],
  searchQuery : '',
  activeTab : '',
  loader : false,
  opened : false
}, action) => {
  switch (action.type) {
    case SEARCH_GET_TABS:
      return {
        ...state,
        activeTab : action.tab || 'content',
        tabs: {
          ...state.tabs,
          ...action.data
        }
      }
    case SEARCH_GET_DATA_BY_QUERY:
      return {
        ...state,
        searchQuery : action.query || '',
        loader : false,
        query : {
          ...state.query,
          ...action.data
        }
      }
    case SEARCH_MORE:
      return {
        ...state,
        query : {
          ...state.query,
          ...action.data,
          items : [
            ...state.query.items,
            ...action.data.items
          ]
        }
      }
    case SEARCH_GET_DATA_BY_PAGE:
      return {
        ...state,
        searchQuery : action.query || '',
        loader : false,
        query : {
          ...state.query,
          ...action.data
        }
      }
    case SEARCH_GET_DATA_BY_TABS:
      return {
        ...state,
        activeTab : action.tab,
        loader : false,
        query : {
          ...state.query,
          ...action.data
        }
      }
    case SEARCH_GET_PREDICATES:
      return {
        ...state,
        predicates : action.items
      }
    case SEARCH_RESET_PREDICATES:
      return {
        ...state,
        predicates : []
      }
    case SEARCH_LOADER:
      return {
        ...state,
        loader : action.loader
      }
    case SEARCH_SHOW_FIELD:
      return {
        ...state,
        opened : action.open
      }
    default:
      return {...state}
  }
}


export default search;
