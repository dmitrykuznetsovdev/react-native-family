const { StyleSheet } = React;
import * as device from '_utils/device';

export default StyleSheet.create({
  container : {
    flex: 1,
    marginTop: device.size(65),
    backgroundColor: '#FFF'
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

