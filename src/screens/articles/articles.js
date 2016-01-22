import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ActivityIndicatorIOS,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import ArticlesList from './articles_list/list';


import {
  fetchArticles,
  fetchArticlesRubric,
  loadMoreArticles
} from '_actions/articles';

import {
  getRubricsBySlug
} from '_actions/common';

class ArticlesScreen extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loader: true
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchArticles())
      .then(()=> {
        setTimeout(()=>this.setState({loader: false}), 1000);
      })
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>mother fucker...</Text>
      </View>
    )
  }

  render() {
    const { articles } = this.props;
    const { loader } = this.state;

    if (loader) {
      return this.renderLoadingView()
    }

    return (articles.items.length ?
        <ArticlesList {...this.props} />
      : null);
  }
}

export default connect(state => ({
  articles: state.articles
}))(ArticlesScreen);
