const { StyleSheet } = React;
import * as device from '/src/utils/device';
import {baseStyleLayoutsContainer} from '/src/styles/base';

export default StyleSheet.create({
  container : {
    ...baseStyleLayoutsContainer
  },
  title : {
    marginTop: device.size(5),
    marginBottom: device.size(12),
    fontSize: 18
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

