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
  const {screenId, to} = props;

  function _onPress(evt) {
    console.log('_onPress');
    evt.stopPropagation();
    //const nativeEvent = evt.nativeEvent;

    localNavigator.push({
      id : screenId,
      navigation_params : {
        ...props,
        to
      }
    })
  }

  return (
    <TouchableHighlight onPress={(evt) => _onPress(evt)}>
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
