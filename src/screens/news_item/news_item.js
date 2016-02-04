import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  InteractionManager,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import styles from './style';
import CardFull from '../../components/card_full';
import Loader from '../../components/loader';


import { getNewsById, getNewsRelated } from '../../module_dal/actions/news';

import {
  getNewsShowcases,
  getNewsDetailShowcase,
  loadMoreShowcase
} from '../../module_dal/actions/showcase';

class NewsItemScreen extends Component {
  constructor(props, context) {
    super(props, context);
    const {navigator}  = this.props;
    this.state = {
      loader: true
    }

    /*const once                = _.once(this.fetchData.bind(this));
     this.didFocusSubscription =
     navigator.navigationContext.addListener('didfocus', once);*/
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData()
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
    let {dispatch, navigation_params} = this.props;
    const id = navigation_params.id;
    dispatch(getNewsById(id))
      .then(()=>this.setState({loader: false}))
      .catch(()=>this.setState({loader: false}))
    dispatch(getNewsDetailShowcase())
    dispatch(getNewsRelated(id))
  }


  render() {
    const { news, navigator } = this.props;
    const { loader } = this.state;
    const { related, detail } = news;

    if (loader || !detail.item) {
      return <Loader />
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

