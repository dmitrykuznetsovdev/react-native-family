import {Http} from '../../utils/http';



const SectionServices = {

  /**
   *
   */
  getSectionVeschi(){
    return Http.get({
      url : '/api/v1/content/sections/glavnaya-razdela-veschi'
    });
  },

  getAllSections(){
    return Http.get({
      url : '/api/v1/content/sections.json'
    });
  }
}

export {SectionServices};
