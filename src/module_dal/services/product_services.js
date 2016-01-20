import {Http} from '_utils/http';


const ProductServices = {

  /**
   *
   * @param params {
   *  page
   *  category
   *  checklistitem
   *  age_list
   *  gender
   *  min_price
   *  max_price
   *  popular
   *  ordering
   * }
   * @returns {*}
   */
  getProducts(params){
    return Http.get({
      url: '/api/v1/content/products.json',
      data : params ? params : null
    });
  },

  getProductsByUrl(url){
    return Http.get({
      url: url
    });
  },

  getProductById(id){
    return Http.get({
      url: `/api/v1/content/products/${id}.json`
    });
  },

  getCategoriesProducts(params){
    return Http.get({
      url: '/api/v1/content/products/market_categories.json',
      data : params ? params : null
    });
  }
}


export {ProductServices};