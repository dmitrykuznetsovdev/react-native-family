const { StyleSheet } = React;
import * as device from '_utils/device';
import {baseStyleLayoutsContainer} from '_app/styles/base';

const flex   = 1;
const center = {
  flex,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

export default StyleSheet.create({
  flex: {
    marginBottom: 10
  },
  container: {
    ...baseStyleLayoutsContainer
  },
  wrapper: {
    flex
  },
  search_line: {
    flexDirection: 'row'
  },
  input: {
    flex,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 4
  },
  search_icon: {
    paddingTop: device.size(7),
    paddingRight: device.size(10),
    paddingLeft: device.size(10)
  },
  loader: {
    ...center,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  loader_text : {
    borderColor: 'gray',
    borderWidth: 1,
    padding : 10,
    backgroundColor : '#999',
    color : '#fff'
  },
  empty: {
    ...center
  },
  marginBottomItem: {
    marginBottom: 10
  },
  tabs: {
    flex,
    flexDirection: 'row',
    marginTop: device.size(15)
  },
  tabText: {
    fontSize: 12,
    color: '#000'
  },
  tabTextCount: {
    fontSize: 9,
    color: '#000'
  },
  tabContent: {
    flex,
    flexDirection: 'row',
    paddingTop: device.size(7),
    paddingRight: device.size(10),
    paddingLeft: device.size(10),
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    height: 30
  }
});

