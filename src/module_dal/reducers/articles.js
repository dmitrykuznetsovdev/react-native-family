import {
		GET_ARTICLES,
		GET_ARTICLES_MORE,
		GET_ARTICLES_BY_RUBRIC,
		GET_ARTICLES_RUBRIC_INFO,
		GET_ARTICLES_BY_RUBRIC_NO_PART,
		GET_ARTICLE_DETAIL,
		GET_ARTICLE_DETAIL_RELATED
} from '_actions/actions';



const articles = (state = {
	detail : {},
	related : {},
	items : [],
	title : 'Статьи',
	nextPage : ''
}, action) => {
	switch (action.type){
		case GET_ARTICLES:
			return {
				...state,
        items : [...action.data.items],
				nextPage : action.data.page.next
			}
		case GET_ARTICLES_BY_RUBRIC:
			return {
				...state,
        items : [...action.data.items],
				nextPage : action.data.page.next
			}
		case GET_ARTICLES_BY_RUBRIC_NO_PART:
			return {
				...state,
				...action.data
			}
		case GET_ARTICLES_RUBRIC_INFO:
			return {
				...state,
				title : action.data.item.title
			}
		case GET_ARTICLE_DETAIL:
			return {
				...state,
				detail : action.data
			}
		case GET_ARTICLE_DETAIL_RELATED:
			return {
				...state,
				related : action.data
			}
		case GET_ARTICLES_MORE:
			let oldCollection = state.items;
			let newCollection = oldCollection.concat(action.data.items);
			return {
				...state,
				items : [...newCollection],
				nextPage: action.data.page.next
			}
		default:
			return {...state}

	}
}

export default articles;
