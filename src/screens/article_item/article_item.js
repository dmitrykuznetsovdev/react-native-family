import React, {
  Text,
  View,
  ListView,
  Component
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';


import {
  fetchArticles,
  fetchArticlesRubric,
  loadMoreArticles
} from '_actions/articles';

import {
  getRubricsBySlug
} from '_actions/common';

class ArticleItemScreen extends Component {

  constructor(props, context) {
    super(props, context);

  }

  componentWillMount() {
    const { dispatch } = this.props;
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>eeeeeee</Text>
      </View>
    );
  }
}

export default connect(state => ({
  articles: state.articles
}))(ArticleItemScreen);
