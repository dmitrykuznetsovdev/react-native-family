const { StyleSheet } = React;

export default StyleSheet.create({

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
  scrollSpinner: {
    marginVertical: 20,
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

