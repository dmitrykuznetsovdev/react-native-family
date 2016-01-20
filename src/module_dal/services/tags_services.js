import {Http} from '_utils/http';

const TagsServices = {

  /**
   *
   */
  getTagsBySlug(slug){
    return Http.get({
      url : `/api/v1/content/${slug}/tags.json`
    });
  }

}

export {TagsServices};