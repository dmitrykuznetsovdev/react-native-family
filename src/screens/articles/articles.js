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
    const { dispatch, navigation_params } = this.props;
    if(navigation_params && navigation_params.rubric) {
      dispatch(fetchArticlesRubric(navigation_params.rubric))
        .then(this.hideLoader.bind(this))
      dispatch(getRubricsBySlug('articles', id))
    } else {
      dispatch(fetchArticles())
        .then(this.hideLoader.bind(this))
    }
  }

  hideLoader(){
    setTimeout(()=>this.setState({loader: false}), 1000);
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
