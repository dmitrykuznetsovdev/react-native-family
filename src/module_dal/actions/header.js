import _ from 'lodash';

import {
    HEADER_MOUSEOVER,
    HEADER_MOUSEOUT,
    HEADER_SUBMENU_SHOW,
    HEADER_SUBMENU_HIDE,
    HEADER_SUBMENU_SET_TYPE,
    MENU_TOGGLE_ACTIVE,
    OVERLAY_SHOW
} from '_actions/actions';

let _timeOutShowSubMenu = null;
let _timeOutMenu        = null;
let _firstShowSubmenu   = true;


/**
 * при первом наведении на ссылку не делаем задержку на показ
 * до тех пор пока Submenu снова не скрылось
 *
 * возвращаем Promise, чтоб потом в components/main_menu/main_menu.js ->
 * изменить тип меню и показать нужные данные
 *
 * @param type
 * @return Promise
 */
export const onShowSubMenu = (type) => dispatch => {
  clearTimer();

  if (_firstShowSubmenu) {
    return new Promise((resolve, reject)=> {
      dispatch({type: HEADER_SUBMENU_SHOW})
      dispatch({type : OVERLAY_SHOW, show : true});
      _firstShowSubmenu = false;
      resolve()
    });
  } else {
    return new Promise((resolve, reject)=> {
      _timeOutShowSubMenu = setTimeout(()=> {
        dispatch({type: HEADER_SUBMENU_SHOW})
        dispatch({type : OVERLAY_SHOW, show : true});
        resolve()
      }, 200)
    });
  }
}


/** Спрятать sub_menu без задержек */
export const onHideSubMenuImmediately = () => dispatch => {
  hideSubMenu()
  dispatch({type: HEADER_SUBMENU_HIDE})
  dispatch({type : OVERLAY_SHOW, show : false});
}

/**
 * Задержка на скрытие sub_menu
 * если навели на другой пункт меню,
 * сбрасываем timeout
 */
export const onHideSubMenu = () => dispatch => {
  clearTimer();
  _timeOutMenu = setTimeout(() => {
    hideSubMenu();
    dispatch({type: HEADER_SUBMENU_HIDE})
    dispatch({type : OVERLAY_SHOW, show : false});
  }, 500)
}

export const onClear = () => dispatch => {
  clearTimer();
}

function hideSubMenu() {
  _firstShowSubmenu = true;
  clearTimer();
}

function clearTimer() {
  if (_timeOutShowSubMenu) {
    clearTimeout(_timeOutShowSubMenu)
    _timeOutShowSubMenu = null;
  }
  if (_timeOutMenu) {
    clearTimeout(_timeOutMenu);
    _timeOutMenu = null;
  }
}
