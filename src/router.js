import React, {
  Component,
  Platform,
  Navigator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as device from '_utils/device';
import ArticlesScreen from '_screens/articles';
import ArticleItemScreen from '_screens/article_item';
import WebViewScreen from '_screens/web_view';
import {SetNavigator} from '_components/link';

const initialRoute = {
  title: 'App Name Test',
  type: 'tab',
  id: 'articles'
}

function renderScene(route, navigator) {

  SetNavigator(navigator);

  let component;
  switch (route.id) {
    case 'articles':
      component = <ArticlesScreen navigator={navigator} {...route} />;
      break;
    case 'articles_item':
      component = <ArticleItemScreen navigator={navigator} {...route} />;
      break;
    case 'web_view':
      component = <WebViewScreen navigator={navigator} {...route} />;
      break;
    case 'settings':
      component = '';
      break;
  }
  return component;
}

function _navBarRouteMapper() {
  return {
    LeftButton: (route, navigator) => {
      return (
        <TouchableOpacity style={styles.crumbIconPlaceholder} onPress={() => { navigator.pop(); }}>
          <Text>Назад</Text>
          {/*<Icon name="arrow-left" style={styles.crumbIcon}/>*/}
        </TouchableOpacity>
      )
    },
    Title: (route) => {
      return (
        <View style={styles.title}>
          <Text style={styles.title_blank}>{route.title || 'TITLE'}</Text>
        </View>
      );
    },
    RightButton: (route) => {
      return (
        <TouchableOpacity style={styles.crumbIconPlaceholder}>
          <Text>Вперед</Text>
          {/*<Icon name="arrow-right" style={styles.crumbIcon}/>*/}
        </TouchableOpacity>
      )
    }
  }
}


/**
 *
 */
export const Router = () => (
  <Navigator
    initialRoute={initialRoute}
    renderScene={renderScene}
    navigationBar={
        <Navigator.NavigationBar routeMapper={_navBarRouteMapper()} />
      }
    style={styles.navigator}/>
)

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  title_blank: {
    width: 2000,
    fontSize: device.fontSize(18),
    lineHeight: device.fontSize(32)
  },
  title_plain: {
    fontSize: device.fontSize(18),
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(34)
  },
  title: {
    backgroundColor: '#315efb',
    height: device.size(45)
  },
  title_item: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: device.size(6),
    fontSize: device.fontSize(18),
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(27)
  },
  crumbIconPlaceholder: {
    flex: 1,
    height: device.size(145),
    paddingTop: device.size(10),
    paddingRight: device.size(10),
    paddingLeft: device.size(10)
  },
  crumbIcon: {
    fontSize: device.fontSize(26),
    color: '#FFF'
  }
})
