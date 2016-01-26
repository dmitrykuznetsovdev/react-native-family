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
  },
  marginBottomItem: {
    marginBottom: 10
  },
  containerArticle: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#E8E8E6',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left'
  },

  thumbnail: {
    width: 70,
    height: 81,
    marginRight: 10
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  tags: {
    flex: 1,
    fontSize: 11,
    marginBottom: 8,
    marginTop: 4,
    color: '#868686',
    textAlign: 'left'
  }
});

