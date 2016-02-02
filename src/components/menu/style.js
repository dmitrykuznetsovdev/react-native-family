import React from 'react-native';
const { StyleSheet } = React;
import * as device from '../../utils/device';


const colorTextAndIcon = {
  color : '#AFB5B9'
}

const item = {
  flex: 1,
  paddingTop : device.size(8),
  paddingBottom : device.size(8),
  fontSize: device.fontSize(15),
  ...colorTextAndIcon
}

let item_active = {
  backgroundColor : '#2F3A47'
}

export default StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection : 'column',
    paddingTop: device.size(65),
    backgroundColor: '#384554',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom : 0,
    right: 0,
    opacity : 0.9
  },
  title: {
    marginVertical: 20,
    fontSize : device.fontSize(25),
    color : '#fff'
  },
  item,
  item_active,
  item_menu : {
    position : 'relative',
    paddingLeft : device.size(45),
    borderColor : '#3F4D5A',
    borderBottomWidth : 1
  },

  w_icons : {
    position : 'absolute',
    left : device.size(8),
    top : device.size(10),
    width  : device.size(30),
    justifyContent: 'center',
    alignItems : 'center'
  },
  icons : {
    fontSize : device.fontSize(15),
    ...colorTextAndIcon
  }
});

