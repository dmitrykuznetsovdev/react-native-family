import React, {
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native';
import styles from './style';


let localNavigator = {
  push : ()=>{}
};

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Link = (props) => {
  function _onPress(screenId, to) {

    localNavigator.push({
      id : screenId,
      navigation_params : {
        to
      }
    })
  }

  return (
    <TouchableHighlight onPress={() => _onPress(props.screenId, props.to)}>
      <View style={props.style}>
        {props.children}
      </View>
    </TouchableHighlight>
  )
}


/**
 * Прокидываем навигатор из src/router.js
 * @param navigator
 * @constructor
 */
export function SetNavigator(navigator){
  localNavigator = navigator;
}

export default Link;
