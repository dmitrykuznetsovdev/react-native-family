import React, {
  Component,
  Platform,
  Navigator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as device from '_utils/device';
import IndexScreen from '_screens/index';
import ArticlesScreen from '_screens/articles';
import ArticleItemScreen from '_screens/article_item';
import NewsScreen from '_screens/news';
import NewsItemScreen from '_screens/news_item';
import Menu from '_components/menu';
import WebViewScreen from '_screens/web_view';
import {SetNavigator} from '_components/link';


var SCREEN_WIDTH = Dimensions.get('window').width;
var BaseConfig   = Navigator.SceneConfigs.FloatFromRight;


const CustomLeftToRightGesture = {
  ...BaseConfig.gestures.pop,
  snapVelocity: 8,
  edgeHitWidth: SCREEN_WIDTH
}

const CustomSceneConfig = {
  ...BaseConfig,
  springTension: 100,
  springFriction: 1,
  gestures: {
    pop: CustomLeftToRightGesture
  }
}


function renderScene(route, navigator) {

  SetNavigator(navigator);

  let component;
  switch (route.id) {
    case 'index_screen':
      component = <IndexScreen navigator={navigator} {...route} />;
      break;
    case 'articles':
      component = <ArticlesScreen navigator={navigator} {...route} />;
      break;
    case 'articles_item':
      component = <ArticleItemScreen navigator={navigator} {...route} />;
      break;
    case 'news':
      component = <NewsScreen navigator={navigator} {...route} />;
      break;
    case 'news_item':
      component = <NewsItemScreen navigator={navigator} {...route} />;
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
class Router extends Component {

  constructor(props) {
    super(props)
    this.state = {
      x: 0
    }

    this.dragging = false;
    this.drag     = {
      x: 0
    }

    this.initialRoute = {
      title: 'App Name Test',
      type: 'tab',
      id: 'articles'
    }
  }

  componentDidMount() {
    const navigator = this.refs.nav;
  }

  _onResponderMove(evt) {
    evt = evt.nativeEvent;
    this.setState({
      x: this.state.x + (evt.pageX - this.drag.x)
    });

    this.drag.x = evt.pageX;
  }

  resetPosition(evt) {
    this.dragging = false;
    this.setState({x: 0})
  }

  _onStartShouldSetResponder(evt) {
    this.dragging = true;
    this.drag     = {
      x: evt.nativeEvent.pageX
    }
    return true;
  }

  getStyle() {
    var transform = [{translateX: this.state.x}];
    return {transform: transform};
  }

  render() {

    console.log(this.getStyle());
    return (
      <View style={styles.root_view}>
        <Menu />

        <View style={[styles.root_view_wrapper, this.getStyle()]}
              onResponderMove={this._onResponderMove.bind(this)}
              onStartShouldSetResponder={this._onStartShouldSetResponder.bind(this)}>

          <Navigator
            ref="nav"
            initialRoute={this.initialRoute}
            renderScene={renderScene}
            configureScene={(route, routeStack)=>CustomSceneConfig}
            navigationBar={<Navigator.NavigationBar routeMapper={_navBarRouteMapper()} />}
            style={styles.navigator}/>
        </View>
      </View>
    )
  }
}

export default Router;

var styles = StyleSheet.create({
  root_view: {
    flex: 1
  },
  root_view_wrapper: {
    flex: 1,
    //position: 'relative',
    //left: 100
  },
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
