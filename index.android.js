/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component, AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import Router from './src/router';

class Root extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <Router {...this.props} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => Root);
