if (window.NODE_ENV != 'production') {
  const items = [];
  window.APPLICATION_STATE = {
    sections : {
      footer_text : ''
    },
    header: {
      hover: false,
      sub_menu: {
        show: false
      },
      data : {
        articles: [],
        news: [],
        sovet: []
      }
    },
    looks : {
      items : items,
      look : {
        main_image : {
          image_url : ''
        },
        announce : '',
        areas : [],
        imageSize : {}
      }
    },
    showcase: {
      showcases1: [],
      showcases2: [],
      showcaseTitle: "showcaseTitle",
      requestSlug: ""
    },
    tags: {
      articles : {
        items : []
      },
      news : {
        items : []
      }
    },
    news: {
      news_list: {
        items : []
      },
      items: [],
      detail : {},
      related : {},
      textFooter: '',
      title : 'Все новости'
    },
    articles: {
      items : [],
      detail : {},
      related : {},
      part1 : [],
      part2 : [],
      title: 'Статьи',
      nextPage: ''
    },
    checklist : {
      collectionChecklist: [],
      activeChecklist: {
        products : []
      },
      genderActive : 0,
      gender: {
        boy: [],
        girl: []
      },
      random: {
        items: []
      },
      loader: false,
      modal : false
    },
    products : {
      categories : [],
      products_list : [],
      filters : {
        min_price: 0,
        max_price: 500000,
        category : null,
        popular : true,
        page: 1
      },
      pageNext : '',
      sort: {},
      loader : true,
      modal : false,
      productId : null
    }
  };
}

const application = (state = {
  firstEnter: window.firstEnter
}, action) => {

  switch (action.type) {
    case 'APP_NOT_FIRST_ENTER':
      window.firstEnter = false;
      return {
        ...state,
        firstEnter: false
      }
    default:
      return {...state}
  }
}

export default application;
