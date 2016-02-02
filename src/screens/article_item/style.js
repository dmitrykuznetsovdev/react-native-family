import React from 'react-native';
const { StyleSheet } = React;
import * as device from '../../utils/device';
import {basePaddingLayouts} from '/src/styles/base';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: device.size(8),
    ...basePaddingLayouts
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

