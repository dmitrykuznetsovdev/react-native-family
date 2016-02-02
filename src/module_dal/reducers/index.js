import { combineReducers } from 'redux';

import articles from './articles';
import news from './news';
import looks from './looks';
import showcase from './showcase';
import tags from './tags';
import menu from './menu';
import header from './header';
import sections from './sections';
import search from './search';
import overlay from './overlay';
import navigator from './navigator';

let reducers = combineReducers({
  navigator,
  overlay,
  header,
  menu,
  tags,
  articles,
  search,
  news,
  showcase,
  looks,
  sections
});


export default reducers;


