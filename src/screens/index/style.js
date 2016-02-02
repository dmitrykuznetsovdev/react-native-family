import React from 'react-native';
const { StyleSheet } = React;
import * as device from '../../utils/device';
import {baseStyleLayoutsContainer} from '../../styles/base';

export default StyleSheet.create({
  container : {
    ...baseStyleLayoutsContainer
  },
  marginBottomItem: {
    marginBottom: 10
  }
});

