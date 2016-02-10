import React, {
  Text,
  View,
  ListView,
  InteractionManager,
  Navigator,
  Component
} from 'react-native';
import _ from 'lodash';
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
    const {navigator}  = this.props;
    this.state = {
      loader: true,
      articles : {
        detail : {},
        related : {},
        items : [],
        title : 'Статьи',
        nextPage : '',
        loader : false
      }
    }

    /*const once                = _.once(this.fetchData.bind(this));
    this.didFocusSubscription =
      navigator.navigationContext.addListener('didfocus', once);*/
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      //this.fetchData()
    });
  }

  componentWillUnmount() {
    //this.didFocusSubscription.remove();
  }

  /**
   * Получаем данные
   * article
   */
  fetchData() {

    let { navigation_params} = this.props;
    const slug = navigation_params.slug;

    /*dispatch(getArticleDetail(slug))
      .then(()=>this.setState({loader: false}))
      .catch(()=>this.setState({loader: false}))

    dispatch(getArticleRelated(slug))
    dispatch(getArticleDetailShowcase())*/
  }

  render() {
    const { navigator } = this.props;
    const { loader, articles } = this.state;
    const { related, detail } = articles;

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

export default ArticleItemScreen
