const { StyleSheet } = React;
import * as device from '../utils/device';

const crumbIconPlaceholder = {
  height: device.size(145),
  paddingTop: device.size(10),
  paddingRight: device.size(10),
  paddingLeft: device.size(10)
}

const crumbIcon = {
  flex: 1,
  fontSize: device.fontSize(26),
  color: '#fff'
}

export const basePaddingLayouts = {
  padding: 10
}

export const baseStyleLayoutsContainer = {
  flex: 1,
  marginTop: device.size(65),
  backgroundColor: '#fff',
  ...basePaddingLayouts
}

export const StatusBarStyle =  StyleSheet.create({
  header : {
    backgroundColor : '#3362c3'
  }
})

export default StyleSheet.create({
  root_view: {
    flex: 1
  },
  root_view_wrapper: {
    flex: 1
  },
  navigator: {
    backgroundColor: '#ffffff'
  },
  title_blank: {
    width: 3000,
    fontSize: device.fontSize(18),
    lineHeight: device.fontSize(32),
    color: '#000'
  },
  title_plain: {
    fontSize: device.fontSize(18),
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(34)
  },
  title: {
    backgroundColor : '#3362c3',
    borderBottomColor: '#E8E8E6',
    borderBottomWidth: 1,
    position : 'relative',
    top : device.size(-20),
    height: device.size(65)
  },
  title_item: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: device.size(12),
    fontSize: device.fontSize(18),
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(27)
  },
  crumbIconPlaceholder: {
    ...crumbIconPlaceholder
  },
  crumbIcon: {
    ...crumbIcon
  },
  crumbIconAngle: {
    ...crumbIcon,
    fontSize: device.fontSize(35),
    bottom : 4
  }
})
