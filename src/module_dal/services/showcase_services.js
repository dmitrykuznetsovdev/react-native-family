import {Http} from '../../utils/http';

const ShowcaseServices = {

  getShowcaseBySlugAll(slug){
    return Http.get({
      url : `/api/v1/content/showcases/${slug}/contents_all_pages.json`
    });
  },

  getShowcaseByUrl(data){
    return Http.get({
      url : data.url,
      data : data.params ? data.params : null
    });
  },

  getSectionsFamily(){
    return Http.get({
      url : '/api/v1/content/sections/family_main.json'
    });
  }

}

export {ShowcaseServices};
