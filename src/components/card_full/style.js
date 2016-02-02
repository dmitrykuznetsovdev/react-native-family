import React from 'react-native';
const { StyleSheet } = React;
import * as device from '../../utils/device';

export const htmlViewStyle = StyleSheet.create({
  p : {
    flex : 1,
    paddingTop: device.size(2),
    paddingBottom: device.size(2),
    fontSize: 10
  },
  a : {
    color : 'red',
    fontSize: 9
  },
  img : {
    flex : 1,
    height : 150,
    paddingTop: device.size(2),
    paddingBottom: device.size(2),
    resizeMode: 'cover'
  },
  li : {
    flex : 1,
    fontSize: 10
  }
})

export default StyleSheet.create({
  card_full : {
    flex: 1
  },

  card : {
    flex: 1,
    paddingTop: device.size(10),
    paddingLeft: device.size(13),
    paddingRight: device.size(13),
    borderColor: '#E8E8E6',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  marginBottomItem : {
    marginBottom : 10
  },

  scrollView : {
    flex: 1,
    marginTop: device.size(39),
    paddingTop: device.size(10),
    paddingBottom: device.size(10),
    paddingLeft: device.size(13),
    paddingRight: device.size(13)
  },

  feed : {

  },
  feed_link : {

  },
  img : {

  },
  img_license : {
    color: '#868686',
    fontSize: 8,
    marginTop: 4
  },
  main_tag : {
    color: '#868686',
    marginTop: 4,
    fontSize: 9,
    paddingBottom : 4
  },
  thumbnail : {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop : 10,
    marginBottom : 10,
    height : 200,
    borderWidth: 0.5,
    borderColor: 'black',
    resizeMode: 'cover'
  },
  title : {
    flex : 1,
    fontSize : 15,
    color: '#000'
  },
  announce : {
    flex : 1,
    marginTop : 20,
    marginBottom : 20
  },
  text: {
    flex : 1,
    marginTop : 20,
    paddingLeft : 10,
    borderLeftWidth: 0.5,
    borderLeftColor: 'black'
  },
  data : {
    flex : 1,
    marginTop : 10,
    fontSize : 10
  },
  inf : {
    flex: 1
  },

  tags : {
    flex : 1,
    flexDirection: 'row',
    marginTop: device.size(20)
  },
  tag_txt : {

  },
  materials : {
    flex : 1,
    marginTop: device.size(20)
  },
  materials_title : {
    fontSize: 12
  },
  materials_item : {
    flex : 1
  },
  materials_item_tag : {
    color : '#868686',
    fontSize: 10,
    paddingTop : 5,
    paddingBottom : 5,
  },
  materials_item_title : {
    fontSize: 10,
    paddingBottom : 10,
  },

  reads : {

  },
  reads_title : {

  }
});

