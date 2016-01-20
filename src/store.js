import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducers from '_reducers/index'
import { writeState } from '_middleware/storage';


const middlewares = [
  thunkMiddleware,
  promiseMiddleware,
  writeState
];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);
export default finalCreateStore(reducers);
