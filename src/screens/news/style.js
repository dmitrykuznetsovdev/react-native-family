const { StyleSheet } = React;
import * as device from '_utils/device';

export default StyleSheet.create({
  container : {
    flex: 1,
    marginTop: device.size(65),
    backgroundColor: '#FFF'
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

