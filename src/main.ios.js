/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {AppRegistry, Component} from 'react-native';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

class Root extends Component {
  static defaultProps = {
    ...App.defaultProps,
    instructions: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  };
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => Root);
