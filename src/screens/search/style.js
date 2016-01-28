const { StyleSheet } = React;
import * as device from '_utils/device';

const flex = 1;

export default StyleSheet.create({
  flex : {
    marginBottom: 20
  },
  container : {
    flex,
    marginTop: device.size(65)
  },
  wrapper : {
    flex : 1,
    backgroundColor: 'red',
    minHeight: 300
  },
  search_line : {
    flexDirection: 'row'
  },
  input : {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 4,
    flex,
  },
  search_icon : {
    paddingTop: device.size(7),
    paddingRight: device.size(10),
    paddingLeft: device.size(10)
  },
  loader: {
    flex,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginBottomItem: {
    marginBottom: 10
  }
});

