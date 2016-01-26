const { StyleSheet } = React;
import * as device from '_utils/device';

let item = {
  flex: 1,
  marginBottom : 5,
  fontSize: device.fontSize(18),
  color : '#fff'
}

let item_active = {
  ...item,
  color : 'red'
}

export default StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection : 'row',
    padding: 5,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom : 0,
    right: 0,
    opacity : 0.8
  },
  title: {
    marginVertical: 20,
  },
  item,
  item_active
});

