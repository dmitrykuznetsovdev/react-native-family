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
let finalCreateStore;

/*if (global.__DEV__) {
  const logger = require('redux-logger')({
    level: 'info',
    collapsed: true,
    colors: false,
    stateTransformer: (state) => state
  });

  finalCreateStore = compose(
    applyMiddleware(...middlewares, logger)
  )(createStore);

}*/

finalCreateStore = applyMiddleware(...middlewares)(createStore);


export default finalCreateStore(reducers);
