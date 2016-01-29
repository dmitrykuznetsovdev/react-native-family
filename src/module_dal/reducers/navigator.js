import { NAVIGATOR_CHANGE } from '../actions/actions';

const navigator = (state = {
  data: {}
}, action) => {
  switch (action.type) {
    case NAVIGATOR_CHANGE:
      return {
        ...state,
        data: {...action.data}
      }
    default:
      return {...state}
  }
}


export default navigator;
