import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import CardFull from '/src/components/card_full';


import { getNewsById, getNewsRelated } from '/src/module_dal/actions/news';

import {
  getNewsShowcases,
  getNewsDetailShowcase,
  loadMoreShowcase
} from '/src/module_dal/actions/showcase';

class NewsItemScreen extends Component {
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
    const id = navigation_params.id;
    dispatch(getNewsById(id)).then(()=> {
      console.log('getNewsById');
    })
    dispatch(getNewsDetailShowcase())
    dispatch(getNewsRelated(id))
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>load news...</Text>
      </View>
    )
  }

  render() {
    let { news, navigator } = this.props;
    let { related, detail, loader } = news;

    if (loader || !detail.item) {
      return this.renderLoadingView()
    }


    return (
      <View style={styles.container}>
        <CardFull
          {...detail.item}
          related={related}
          navigator={navigator}
          contentType='news'/>
      </View>
    );
  }
}

export default connect(state => ({
  news: state.news,
  showcases: state.showcase,
}))(NewsItemScreen);

