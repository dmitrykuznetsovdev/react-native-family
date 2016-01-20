import {
    GET_SECTION_SHOWCASE,
    APPEND_SECTION_SHOWCASE,
    SET_TITLE_SHOWCASE
} from '_actions/actions';

const showcase = (state = {
  showcases1: [],
  showcases2: [],
  requestSlug: '',
  showcaseTitle: ''
}, action) => {

  switch (action.type) {
    case GET_SECTION_SHOWCASE:
      let next = Number.parseInt(action.data[1].count) > 5 && action.data[1].request.slug;
      return {
        ...state,
        showcases1: action.data[0].items,
        showcases2: action.data[1].items,
        requestSlug: next ? action.data[1].request.slug : null
      }
    case APPEND_SECTION_SHOWCASE:
      const countSlice = action.countSlice;
      const except = action.data.items.slice(countSlice);
      let oldCollection = state.showcases2;
      let newCollection = oldCollection.concat(except);
      return {
        ...state,
        showcases2: newCollection,
        requestSlug: null
      }
    case SET_TITLE_SHOWCASE:
      return {
        ...state,
        showcaseTitle : action.title
      }
    default:
      return {...state}
  }
}

export default showcase;
