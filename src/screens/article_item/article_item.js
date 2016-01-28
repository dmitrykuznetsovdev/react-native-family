import React, {
  Text,
  View,
  ListView,
  Navigator,
  Component
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import CardFull from '_components/card_full';


import { getArticleDetail, getArticleRelated } from '_actions/articles';

import {
  getNewsShowcases,
  getArticleDetailShowcase,
  loadMoreShowcase
} from '_actions/showcase';

class ArticleItemScreen extends Component {

  constructor(props, context) {
    super(props, context);

  }

  componentDidMount() {
    this.fetchData()
  }

  /**
   * Получаем данные
   * article
   */
  fetchData() {
    let {dispatch, navigation_params} = this.props;
    const slug = navigation_params.slug;
    dispatch(getArticleDetail(slug))
    dispatch(getArticleRelated(slug))
    dispatch(getArticleDetailShowcase())
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>load article...</Text>
      </View>
    )
  }

  render() {
    let { articles, navigator } = this.props;
    let { related, detail, loader } = articles;

    if (loader || !detail.item) {
      return this.renderLoadingView()
    }


    return (
      <View style={styles.container}>
        <CardFull
          {...detail.item}
          related={related}
          navigator={navigator}
          contentType='articles'/>
      </View>
    );
  }
}

export default connect(state => ({
  showcases: state.showcase,
  articles: state.articles
}))(ArticleItemScreen);
