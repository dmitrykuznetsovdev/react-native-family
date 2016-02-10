/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component, AppRegistry} from 'react-native';
import Router from './src/router';

class Root extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Router {...this.props} />
    );
  }
}

AppRegistry.registerComponent('App', () => Root);
