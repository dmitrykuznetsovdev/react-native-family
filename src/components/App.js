/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component, PropTypes} from 'react-native';
import {connect} from 'react-redux';

const {
        Platform,
        StyleSheet,
        Text,
        View,
        Image,
        AlertIOS,
        ListView
        } = React;


import {
  fetchArticles,
  fetchArticlesRubric,
  loadMoreArticles
} from '_actions/articles';

import {
  getRubricsBySlug
} from '_actions/common';

class App extends Component {

  static propTypes = {
    instructions: PropTypes.string,
  };

  static defaultProps = {
    ...Component.defaultProps,
    instructions: 'Usage instructions not provided.'
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Platform.OS,
      test: 'test test'
    };
  }

  _onTestClick() {
    const { dispatch } = this.props;
    dispatch(fetchArticles())
  }

  renderMovie(article) {
    console.log(article);
    const image = article.main_image && article.main_image.image_url ?
      article.main_image.image_url : '';

    return (

      <View style={styles.containerArticle}>
        <Image
          source={{uri: image}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{article.title}</Text>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.containerArticle}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  render() {
    const { instructions, articles } = this.props;
    let { platform } = this.state;

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.{platform}.js
        </Text>
        <Text style={styles.instructions} onPress={this._onTestClick.bind(this)}>
          {instructions}
        </Text>

        {articles.part1.length ?
          <ListView
            dataSource={dataSource.cloneWithRows(articles.part1)}
            renderRow={this.renderMovie}
            style={styles.listView}
          /> : null}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  containerArticle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

export default connect(state => ({
  articles: state.articles
}))(App);
