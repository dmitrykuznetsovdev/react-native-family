import {Http} from '_utils/http';



const ArticleServices = {

  /**
   *
   */
  getArticles(params){
    return Http.get({
      url : '/api/v1/content/articles.json',
      data : params ?  params : ''
    });
  },

  /**
   *
   */
  getArticleId (slug){
    return Http.get({
      url : `/api/v1/content/articles/${slug}.json`
    });
  },

  getArticlesByUrl(data){
    return Http.get({
      url : data.url,
      data : data.params ? data.params : null
    });
  },

  /**
   *
   */
  getArticleRelated (id){
    return Http.get({
      url : `/api/v1/content/articles/${id}/related.json`
    });
  },

  /**
   *
   */
  getArticleDetailShowcase (){
    return Http.get({
      url : '/api/v1/content/sections/articles_detail.json'
    });
  },

  /**
   *
   */
  getArticlesByRubric(data) {
    const tagList = data.rubric ? `tag_list=${data.rubric}` : '';
    return Http.get({
      url : `/api/v1/content/articles.json?${tagList}`,
      data : data.params
    });
  }
}

export {ArticleServices};
