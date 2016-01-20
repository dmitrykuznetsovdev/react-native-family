import {Http} from '_utils/http';



const NewsServices = {

  /**
   * получение списка новостей
   * параметры page, rubric
   * можно получать данные по id страницы и по рубрике
   * */
  getNewsContent(page = 1, rubric = ''){
    let rubr = rubric ? `&tag_list=${rubric}` : '';

    return Http.get({
      url : `/api/v1/content/news.json?page=${page}${rubr}`
    });
  },

  getUniqNewsContent(params){
    const page_size = params && params.page_size ? params.page_size : '';
    return Http.get({
      url : `/api/v1/content/news.json?feed=null&page_size=${page_size}`
    });
  },

  getNewsSections(){
    return Http.get({
      url : '/api/v1/content/sections/news_main.json'
    });
  },

  /** */
  getNewsId (id){
    return Http.get({
      url : `/api/v1/content/news/${id}.json`
    });
  },


  /** */
  getNewsDetailShowcase(){
    return Http.get({
      url : '/api/v1/content/sections/news_detail.json'
    });
  },

  /** */
  getNewsRelated(id){
    return Http.get({
      url : `/api/v1/content/news/${id}/related.json`
    });
  },

  getNewsContentByRubric(rubric) {
    return Http.get({
      url : `/api/v1/content/news.json?tag_list=${rubric}`
    });
  },

  getNewsRubricSections(){
    return Http.get({
      url : '/api/v1/content/sections/news_rubric.json'
    });
  },
}



export {NewsServices};