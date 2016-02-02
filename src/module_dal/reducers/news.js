import {
		GET_UNIQUE_NEWS_CONTENT,
		GET_NEWS_LIST,
		GET_NEWS_DETAIL,
		GET_NEWS_DETAIL_RELATED,
		GET_NEWS_BY_RUBRIC,
		GET_NEWS_RUBRIC_INFO
} from '_actions/actions';

const news = (state = {
	news_list: {
		items : []
	},
	items: [],
	detail : {},
	related : {},
	title : 'Все новости'
}, action) => {
	switch (action.type){
		case GET_UNIQUE_NEWS_CONTENT:
			return {
				...state,
				...action.data
			}
		case GET_NEWS_LIST:
			return {
				...state,
				news_list : {
          ...state.news_list,
          ...action.data,
          items : [
            ...state.news_list.items,
            ...action.data.items
          ]
        }
			}
		case GET_NEWS_DETAIL:
			return {
				...state,
				detail : action.data
			}
		case GET_NEWS_DETAIL_RELATED:
			return {
				...state,
				related : action.data
			}
		case GET_NEWS_BY_RUBRIC:
			return {
				...state,
				news_list : {
          ...state.news_list,
          ...action.data,
          items : [
            ...state.news_list.items,
            ...action.data.items
          ]
        }
			}
		case GET_NEWS_RUBRIC_INFO:
			return {
				...state,
				title : action.data.item.title
			}
		default:
			return {...state}
	}
}

export default news;
