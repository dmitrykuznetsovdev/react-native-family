import {Http} from '../../utils/http';

const ShareServices = {

  /**
   * post parameters:
   *   email
   *   content_slug
   *
   * @param data
   * @returns {*}
   */
  sendContentBySlug(data){
    return Http.post({
      url : '/api/v1/email/content/page.json',
      data : data ? data : null
    });
  }
}

export {ShareServices};
