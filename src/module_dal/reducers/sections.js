import {
    SET_SECTION_FOOTER_TEXT
} from '_actions/actions';

const sections = (state = {
  footer_text : ''
}, action) => {

  switch (action.type) {
    case SET_SECTION_FOOTER_TEXT:
      return {
        footer_text : action.data.text
      }
    default:
      return {...state}
  }
}

export default sections;