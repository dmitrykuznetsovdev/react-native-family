import React from 'react-native';
const { StyleSheet } = React;
import * as device from '../../utils/device';
import {basePaddingLayouts} from '../../styles/base';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: device.size(8),
    ...basePaddingLayouts
  }
});

