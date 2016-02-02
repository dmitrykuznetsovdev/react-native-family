import {
		HEADER_MOUSEOVER,
		HEADER_MOUSEOUT,
		HEADER_SUBMENU_SHOW,
		HEADER_SUBMENU_HIDE,
		HEADER_SUBMENU_SET_TYPE,
		HEADER_SET_DATA
} from '../actions/actions';


const header = (state = {
	hover : false,
	sub_menu : {
		show : false
	},
	data : {
		articles: [],
		news: [],
		sovet: []
	}
}, action) => {
	switch (action.type){
		case HEADER_MOUSEOVER:
			return { ...state, hover : true }
		case HEADER_MOUSEOUT:
			return { ...state, hover : false }
		case HEADER_SUBMENU_SET_TYPE:
			return {
				...state,
				sub_menu : {
					...state.sub_menu,
					type : action.type
				}
			}
		case HEADER_SUBMENU_SHOW:
			return {
				...state,
				sub_menu : {
					...state.sub_menu,
					show : true
				}
			}
		case HEADER_SUBMENU_HIDE:
			return {
				...state,
				sub_menu : {
					...state.sub_menu,
					show : false
				}
			}
		case HEADER_SET_DATA:
			const dataForHeader = {
				articles: action.data[0].data,
				news: action.data[1].data,
				sovet: action.data[2].data
			};
			return {
				...state,
				data : {...dataForHeader}
			}
		default:
			return {...state}

	}
}

export default header;
