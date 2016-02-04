import React, {
  Text,
  View,
  ListView,
  Navigator,
  Component
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import CardFull from '../../components/card_full';
import Loader from '../../components/loader';


import {
  getArticleDetail,
  getArticleRelated
} from '../../module_dal/actions/articles';

import {
  getNewsShowcases,
  getArticleDetailShowcase,
  loadMoreShowcase
} from '../../module_dal/actions/showcase';

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

  render() {
    let { articles, navigator } = this.props;
    let { related, detail, loader } = articles;

    if (loader || !detail.item) {
      return <Loader />
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
