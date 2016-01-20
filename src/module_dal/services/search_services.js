import {Http} from '_utils/http';


const SearchServices = {

  /**
   * @param data = {query : query}
   */
  getSearchTabs(data){
    return Http.get({
      data : data,
      url : '/api/v1/content/content/searchtabs.json'
    });
  },

  /**
   * @param url {String}
   */
  getSearchByUrl(url){
    return Http.get({ url : url });
  },

  getSearchByPage(type, query, page){
    return Http.get({
      url : `/api/v1/content/${type}.json?query=${query}&page=${page}`
    });
  },

  /**
   * @param type {String}
   * @param query {String}
   */
  getContentByType(type, query){
    return Http.get({
      url : `/api/v1/content/${type}.json?query=${query}`
    });
  },

  getPredicates(query, contentType){
    return Http.get({
      url : `/api/v1/content/${contentType}/prediction.json`,
      data : {
        query
      }
    });
  }
}



export {SearchServices};