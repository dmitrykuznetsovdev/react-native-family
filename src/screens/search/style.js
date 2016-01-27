const { StyleSheet } = React;
import * as device from '_utils/device';

export default StyleSheet.create({
  container : {
    flex: 1,
    marginTop: device.size(65),
    backgroundColor: '#FFF'
  },
  search_line : {
    flex: 1,
    flexDirection: 'row',
    justifyContent : 'flex-start',
    flexWrap : 'nowrap'
  },
  search_icon : {
    height: device.size(145),
    paddingTop: device.size(7),
    paddingRight: device.size(10),
    paddingLeft: device.size(10),
    alignItems : 'flex-end'
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

