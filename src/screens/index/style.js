const { StyleSheet } = React;
import * as device from '_utils/device';
import {baseStyleLayoutsContainer} from '_app/styles/base';

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

