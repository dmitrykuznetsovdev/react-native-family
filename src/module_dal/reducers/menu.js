import _ from 'lodash';
import Url from 'url';

import {
    MENU_TOGGLE_ACTIVE,
    MENU_SET_TYPE,
    MENU_SET_SUBMENU_TOUCH
} from '_actions/actions';


let subMenu  = new Map();
let mainMenu = new Map();


mainMenu.set('articles', {
  name: 'Статьи',
  url: '/articles/',
  type: 'articles'
});
mainMenu.set('news', {
  name: 'Новости',
  url: '/news/',
  type: 'news'
});
mainMenu.set('sovet', {
  name: 'Вещи',
  url: '/sovet/',
  type: 'sovet'
});

const SUBMENU_SOVET = [
  {
    type: 'sovet',
    title: 'Чек-листы',
    url: '/sovet/cheklisti/'
  }, {
    type: 'sovet',
    title: 'Стили',
    url: '/sovet/stil/'
  }, {
    type: 'sovet',
    title: 'Рекомендации',
    url: '/articles/veschi/'
  }, {
    type: 'sovet',
    title: 'Товары',
    url: '/sovet/items/'
  }
]

const SUB_MENU_TOUCH = [
  {
    name: mainMenu.get('news').name,
    url: mainMenu.get('news').url,
    type: mainMenu.get('news').type,
    subMenu: []
  },
  {
    name: mainMenu.get('articles').name,
    url: mainMenu.get('articles').url,
    type: mainMenu.get('articles').type,
    subMenu: []
  },
  {
    name: mainMenu.get('sovet').name,
    url: mainMenu.get('sovet').url,
    type: mainMenu.get('sovet').type,
    subMenu: [...SUBMENU_SOVET]
  }
]


const MENU_FOOTER = {
  servicesMenu : [
    {name: 'Размещение рекламы', url: 'http://reklama.rambler.ru'},
    {name: 'Правила пользования и конфиденциальность', url: 'http://help.rambler.ru/legal/family'},
    {name: 'Обратная связь', url: 'http://help.rambler.ru/feedback/family'},
    {name: 'Вакансии', url: 'http://www.rambler-co.ru/jobs'}
  ],
  ramblerItem: {name: '© Рамблер, 2015', url: 'http://www.rambler-co.ru'},
  fullVersionItem: {name: 'Полная версия', url: 'https://family.rambler.ru'}
}

/**
 * Получение данных по слагу
 */
function getDataByType(slug) {
  return subMenu.get(slug);
}

/**
 * Сохранение данных по слагу
 */
function setDataByType(slug, data) {
  let items = data.items && data.items.length ? data.items : [];
  subMenu.set(slug, items);
}


/**
 * TODO:
 * парсим url - делаем пункт меню активным
 */
function parseUrl() {
  let url = Url.parse('');
  url     = _.compact(url.href.split('/'));
  url     = url.length ? url[0] : '';
  return url;
}

/**
 *
 * @param data
 * @param type
 * @returns {Array}
 */
function setActiveMenu(data, type) {
  let menu = [...data];
  menu.map((item)=> {
    item._active = (item.type == type);
  })
  return menu;
}


function toggleActiveItem(data, type) {
  let menu = [...data];
  menu.map((item)=> {
    item.activeHover = (item.type == type);
  })
  return menu;
}

const menu = (state = {
  typeData: {},
  menuTypeActive: parseUrl(),
  mainMenu: [...setActiveMenu([...mainMenu.values()], parseUrl())],
  subMenuTouch: [...SUB_MENU_TOUCH],
  menuFooter : MENU_FOOTER,
  getMainMenu(){
    return [...mainMenu.values()]
  },
  getSubMenuSovet(){
    return [...SUBMENU_SOVET]
  }
}, action) => {
  switch (action.type) {
    case MENU_TOGGLE_ACTIVE:
      return {
        ...state,
        mainMenu: [...toggleActiveItem(state.mainMenu, action.menuType)]
      }
    case MENU_SET_TYPE:
      return {
        ...state,
        menuTypeActive: action.menuType
      }
    case MENU_SET_SUBMENU_TOUCH:
      return {
        ...state,
        subMenuTouch: [
          {
            ...state.subMenuTouch[0],
            subMenu : action.touchSubMenu.news
          },
          {
            ...state.subMenuTouch[1],
            subMenu : action.touchSubMenu.articles
          },
          {
            ...state.subMenuTouch[2],
          }
        ]
      }
    default:
      return {...state}

  }
}

export default menu;
