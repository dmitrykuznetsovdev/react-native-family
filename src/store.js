import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducers from '_reducers/index'
import { writeState } from '_middleware/storage';
import { crashReporter } from '_middleware/crash_reporter';


const middlewares = [
  thunkMiddleware,
  promiseMiddleware,
  writeState,
  //crashReporter
];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);
export default finalCreateStore(reducers);
