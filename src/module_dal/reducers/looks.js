
import {
    GET_LOOKS,
    GET_LOOKS_BY_SLUG,
    SET_ACTIVE_LOOK,
    LOOKS_IMAGE_SIZE,
    FILTER_EXCLUDE_LOOK,
    LOOK_SELECTED,
    LOOK_UN_SELECTED
} from '_actions/actions';


/**
 * при первом получении луков перемешиваем их
 * и делаем первый активным
 * @param looks
 * @returns {Array}
 */
function firstActiveAndShuffle(looks){
  let looksList = [...looks];
  looksList.shuffle();
  looksList[0].active = true;
  return looksList;
}

/**
 * переключаем активные луки
 * @param looks
 * @param id
 * @returns {Array}
 */
function toggleActiveLook(looks, id){
  let looksList = [...looks];
  looksList.forEach((look)=>{
    if(look.id == id) look.active = true;
    else look.active = false;
  })
  return looksList;
}


function lookSelected(areas, id){
  let newAreas = [...areas];
  newAreas.map((item)=>{
    item.activeClass = (item.id == id) ? true : false
  })
  return newAreas;
}

function lookUnSelected(areas, id){
  let newAreas = [...areas];
  newAreas.map((item)=>{ item.activeClass = false })
  return newAreas;
}




/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
const looks = (state = {
  items : [],
  look : {
    main_image : {
      image_url : ''
    },
    announce : '',
    areas : [],
    imageSize : {}
  },
}, action) => {
  switch (action.type) {
    case GET_LOOKS:
      return {
        ...state,
        items : firstActiveAndShuffle(action.data.items)
      }
    case SET_ACTIVE_LOOK:
      return {
        ...state,
        items : toggleActiveLook(state.items, action.id)
      }
    case FILTER_EXCLUDE_LOOK:
    case LOOKS_IMAGE_SIZE:
      return {
        ...state,
        look : {
          ...state.look,
          imageSize : action.data
        }
      }
    case GET_LOOKS_BY_SLUG:
      return {
        ...state,
        look : action.data
      }
    case LOOK_SELECTED:
      return {
        ...state,
        look : {
          ...state.look,
          areas : [...lookSelected(state.look.areas, action.id)]
        }
      }
    case LOOK_UN_SELECTED:
      return {
        ...state,
        look : {
          ...state.look,
          areas : [...lookUnSelected(state.look.areas, action.id)]
        }
      }
    default:
      return {...state}
  }
}

export default looks;
