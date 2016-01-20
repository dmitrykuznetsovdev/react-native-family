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
    SEARCH_SHOW_FIELD
} from '_actions/actions';


function createFakeArray(count) {
  return Array.apply(0, Array(count));
}

function changeUrl(searchQuery, activeTab) {
}



const search = (state = {
  tabs : {
    items : []
  },
  query : {
    items : []
  },
  fakeArray : [],
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
      changeUrl(action.query, action.tab);
      return {
        ...state,
        searchQuery : action.query || '',
        fakeArray : createFakeArray(action.data.count),
        query : {
          ...state.query,
          ...action.data
        }
      }
    case SEARCH_GET_DATA_BY_PAGE:
      return {
        ...state,
        searchQuery : action.query || '',
        query : {
          ...state.query,
          ...action.data
        }
      }
    case SEARCH_GET_DATA_BY_TABS:
      return {
        ...state,
        activeTab : action.tab,
        fakeArray : createFakeArray(action.data.count),
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
