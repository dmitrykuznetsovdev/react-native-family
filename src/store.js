import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducers from '/src/module_dal/reducers/index'
import { writeState } from '/src/module_dal/middleware/storage';
import { crashReporter } from '/src/module_dal/middleware/crash_reporter';

const middlewares = applyMiddleware([
  thunkMiddleware,
  promiseMiddleware,
  writeState,
  //crashReporter
]);
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

finalCreateStore = createStore(
  reducers,
  compose(
    middlewares
  )
)

export default finalCreateStore;

