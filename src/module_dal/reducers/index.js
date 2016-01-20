import { combineReducers } from 'redux';

import articles from './articles';
import news from './news';
import products from './products';
import application from './application_state';
import looks from './looks';
import showcase from './showcase';
import tags from './tags';
import checklist from './checklist';
import menu from './menu';
import header from './header';
import sections from './sections';
import search from './search';
import overlay from './overlay';

let reducers = combineReducers({
  overlay,
  header,
  menu,
  checklist,
  tags,
  articles,
  search,
  news,
  products,
  application,
  showcase,
  looks,
  sections
});


export default reducers;


