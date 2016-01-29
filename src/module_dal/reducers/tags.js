import {SET_TAG_BY_SLUG} from '../actions/actions';

const tags = (state = {
  articles : {
    items : []
  },
  news : {
    items : []
  }
}, action) => {
  switch (action.type) {
    case SET_TAG_BY_SLUG:
      return {
        ...state,
        ...action.data
      }
    default:
      return {...state}
  }
}

export default tags;
