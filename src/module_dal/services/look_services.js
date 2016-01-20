import {Http} from '_utils/http';


/**
 * @link https://gitlab.rambler.ru/letidor/letidor/blob/develop/docs/api_v1/backtoschool/current/look.md
 * @type {{getLookList, getLookId}}
 */
const LookServices = {

  getLookBySlug(slug){
    return Http.get({
      url : `/api/v1/content/looks/${slug}.json`
    });
  },

  /**
   * получение списка Look
   * @returns {*}
   */
  getLooks(params){
    const page_size = params && params.page_size ? params.page_size : '';
    return Http.get({
      url : `/api/v1/content/looks.json?page_size=${page_size}`
    });
  }
}

export {LookServices};