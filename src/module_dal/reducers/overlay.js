import {
    OVERLAY_SHOW,
} from '../actions/actions';


const overlay = (state = {
  show : false
}, action) => {
  switch (action.type) {
    case OVERLAY_SHOW:
      return {
        ...state,
        show : action.show
      }
    default:
      return {...state}
  }
}


export default overlay;
