import Raven from 'raven-js';
import StackTrace from 'stacktrace-js';
import _ from 'lodash';
import { RAVEN_CAPTURE_EXCEPTION } from '../actions/actions';


function captureException(err, action, store) {
  StackTrace.fromError(err, {offline: true})
      .then((data)=> {
        Raven.captureException(err, {
          extra: {
            stackTrace: data,
            actionType: action.type
          }
        });
      })
}

const _logExeption = _.debounce(captureException.bind(this), 1000);

export const crashReporter = store => next => action => {
  if (action.type == RAVEN_CAPTURE_EXCEPTION) {
    _logExeption(action.data, action, store);
  } else {
    try {
      return next(action)
    } catch (err) {
      _logExeption(err, action, store);
    }
  }
}
