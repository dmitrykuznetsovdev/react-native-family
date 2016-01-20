import {
		GET_ARTICLES,
		GET_ARTICLES_MORE,
		GET_ARTICLES_BY_RUBRIC,
		GET_ARTICLES_RUBRIC_INFO,
		GET_ARTICLES_BY_RUBRIC_NO_PART,
		GET_ARTICLE_DETAIL,
		GET_ARTICLE_DETAIL_RELATED
} from '_actions/actions';


/**
 *
 * Создаем две коллекции стиска статей
 * первая колллекция от 0 до 8
 * вторая от 8
 *
 * нужно разбить для размешения на разных частях страницы
 * @param data
 * @returns {{
 * 	part1: (Array.<T>|string|Buffer|Blob|ArrayBuffer),
 * 	part2: (Array.<T>|string|Buffer|Blob|ArrayBuffer)
 * }}
 */
function dividedIntoParts(data){
	let parts = {...data};
	let part1 = parts.items.slice(0, 8);
	let part2 = parts.items.slice(8);

	return {part1, part2}
}

const articles = (state = {
	detail : {},
	related : {},
	items : [],
	part1 : [],
	part2 : [],
	title : 'Статьи',
	nextPage : ''
}, action) => {
	switch (action.type){
		case GET_ARTICLES:
			return {
				...state,
				...dividedIntoParts(action.data),
				nextPage : action.data.page.next
			}
		case GET_ARTICLES_BY_RUBRIC:
			return {
				...state,
				...dividedIntoParts(action.data),
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
			let oldCollection = state.part2;
			let newCollection = oldCollection.concat(action.data.items);
			return {
				...state,
				part2 : newCollection,
				nextPage: action.data.page.next
			}
		default:
			return {...state}

	}
}

export default articles;