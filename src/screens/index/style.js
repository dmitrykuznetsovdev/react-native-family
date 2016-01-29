const { StyleSheet } = React;
import * as device from '../../utils/device';
import {baseStyleLayoutsContainer} from '../../styles/base';

export default StyleSheet.create({
  container : {
    ...baseStyleLayoutsContainer
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginBottomItem: {
    marginBottom: 10
  }
});

