import React, {
  Text,
  View,
  TouchableWithoutFeedback,
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
  const {to} = props;

  function _onPress(evt) {
    evt.stopPropagation();
    //const nativeEvent = evt.nativeEvent;

    localNavigator.push({
      id : to,
      navigation_params : {
        to,
        ...props
      }
    })
  }

  return (
    <TouchableWithoutFeedback onPress={(evt) => _onPress(evt)}>
      <View style={props.style}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
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
