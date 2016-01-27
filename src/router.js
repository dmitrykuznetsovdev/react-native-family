import React, {
  Component,
  PanResponder,
  Animated,
  Easing,
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
import _ from 'lodash';

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
      x: 0,
      translateX: new Animated.Value(0),
      opacity: 1
    }

    this.dragging    = false;
    this._isOpenMenu = false;
    this._drag       = {
      x: 0,
      y: 0,
      dragX: 115,
      dragY: 100,
      dragBack: 60
    }


    this.initialRoute = {
      title: 'App Name Test',
      type: 'tab',
      id: 'articles'
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: this._onStartShouldSetResponder.bind(this),
      onMoveShouldSetPanResponder: this._onResponderMove.bind(this),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false
    });
  }

  componentWillMount() {

  }

  /**
   * отслеживаем swipe событие
   * сдвигаем главную View и показываем меню
   *
   * Условия по которым происходит анимация смещения View
   *   если swipe по X больше чем 115
   *   если меню еще не открыто
   *   если смещение по Y не больше 100
   *
   *
   * Если смещение по Y больше 100, то прячем меню
   *
   * @param evt
   * @param gestureState
   * @returns {boolean}
   * @private
   */
  _onResponderMove(evt, gestureState) {
    evt                   = evt.nativeEvent;
    const {x, y, dragX, dragY, dragBack} = this._drag;
    const positionX       = Math.round(this.state.x + (evt.pageX - x));
    const prevPositionX   = Math.round(x);
    const revertPositionX = prevPositionX - (prevPositionX + positionX);
    const isOpen          = this._isOpenMenu;

    function move() {
      if (Math.abs(evt.pageY - y) > dragY && isOpen) {
        this.resetPosition()
      }

      if (positionX > dragX && revertPositionX < 0 && !isOpen && Math.abs(evt.pageY - y) < dragY) {
        this._isOpenMenu = true;
        Animated.spring(
          this.state.translateX,
          {
            toValue: 150,
            duration: 300,
            easing: Easing.elastic(2)
          }
        ).start();
        this._drag.x = evt.pageX;
      } else if (revertPositionX >= dragBack && isOpen) {
        this.resetPosition()
      }
    }

    setTimeout(move.bind(this), 66);
    return false;
  }

  resetPosition(evt) {
    this.dragging    = false;
    this._isOpenMenu = false;
    Animated.spring(
      this.state.translateX,
      {toValue: 0, duration: 300}
    ).start();
  }

  _onStartShouldSetResponder(evt) {
    this.dragging = true;
    this._drag    = {
      ...this._drag,
      x: evt.nativeEvent.pageX,
      y: evt.nativeEvent.pageY
    }
    return false;
  }

  getStyle() {
    return {
      transform: [{
        translateX: this.state.translateX
      }]
    };
  }

  render() {
    return (
      <View style={styles.root_view}
        {...this._panResponder.panHandlers}>

        <Menu />

        <Animated.View style={[styles.root_view_wrapper, this.getStyle()]}>
          <Navigator
            ref="nav"
            initialRoute={this.initialRoute}
            renderScene={renderScene}
            configureScene={(route, routeStack)=>CustomSceneConfig}
            navigationBar={<Navigator.NavigationBar routeMapper={_navBarRouteMapper()} />}
            style={styles.navigator}/>
        </Animated.View>
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
    flex: 1
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
