import React from 'react-native';
const { StyleSheet } = React;
import * as device from '../../utils/device';

export default StyleSheet.create({
  loader: {
    flex: 1,
    width : 120,
    flexDirection : 'row'
  },
  item : {
    width : 20,
    height : 20,
    color : '#196BFA'
  }
});

