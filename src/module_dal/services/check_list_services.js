import {Http} from '_utils/http';

const version = 'api/v1'; //

/**
 */
const CheckListServices = {

  /**
   * page
   * @param params
   * @returns {*}
   */
  getChecklists(slug){
    return Http.get({
      url : `/${version}/content/checklists/${slug}.json`
    });
  },


  getChecklistsPreviewByUrl(url){
    return Http.get({
      url : url
    });
  },

  getCheckByPage(page){
    return Http.get({
      url : `/${version}/content/checklists.json`,
      data : page ? page : null
    });
  },


  getTemplates(){
    return Http.get({
      url: `/${version}/content/checklists/select.json`
    });
  },

  /** отправить на почту */
  shareChecklist(data){
    return Http.post({
      url : `/${version}/storage/userchecklist.json`,
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data)
    });
  },

  /** получаем чек-лист который отправляли себе на почту */
  getShareChecklist(hash){
    return Http.get({
      url : `/${version}/storage/userchecklist/${hash}.json`
    });
  }
}

export {CheckListServices};
