import {Http} from '_utils/http';



const RubricServices = {

  /**
  *
  */
  getRubrics(content_type){
    return Http.get({
      url : '/api/v1/content/' + content_type + '/rubric.json'
    });
  },

  getRubricsBySlug(content_type, slug){
    return Http.get({
      url : `/api/v1/content/${content_type}/rubric.json?tag_slug=${slug}`
    });
  }

}

export {RubricServices};