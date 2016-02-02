import React, {
  Text,
  View,
  Component
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

const Loader = (props) => {
  return (
    <View style={styles.loader}>
      <Icon name="circle" style={styles.item}/>
      <Icon name="circle" style={styles.item}/>
      <Icon name="circle" style={styles.item}/>
    </View>
  )
}

export default Loader;
