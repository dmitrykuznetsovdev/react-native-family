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
import _ from 'lodash';
import styles from './style';
import CardFull from '../../components/card_full';
import Loader from '../../components/loader';

import {NewsServices} from '../../module_dal/services/news_services';
import {TagsServices} from '../../module_dal/services/tags_services';
import {ShowcaseServices} from '../../module_dal/services/showcase_services';
import {RubricServices} from '../../module_dal/services/rubric_services';

/*import { getNewsById, getNewsRelated } from '../../module_dal/actions/news';
import {
  getNewsShowcases,
  getNewsDetailShowcase,
  loadMoreShowcase
} from '../../module_dal/actions/showcase';*/

class NewsItemScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loader: true,
      news : {
        detail : {},
        related : {},
        title : 'Все новости'
      }
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData()
    });
  }

  componentWillUnmount() {

  }

  /**
   * Получаем данные
   * article
   */
  fetchData() {
    let { navigation_params} = this.props;
    const id = navigation_params.id;

    this.getNewsById(id)
      .then(()=>this.setState({loader: false}))
      .catch(()=>this.setState({loader: false}))

    //this.getNewsRelated(id)

    /*dispatch(getNewsById(id))
    dispatch(getNewsDetailShowcase())
    dispatch(getNewsRelated(id))*/
  }


  getNewsById (id) {
    return NewsServices.getNewsId(id)
      .then((data)=>{
        this.setState({
          news : {
            ...this.state.news,
            detail: data
          }
        })
      })
      .catch(this.failLoadContent);

    //dispatch({type: GET_NEWS_DETAIL, data})
  }

  getNewsRelated (id) {
    return NewsServices.getNewsRelated(id)
      .then((data)=>{
        this.setState({
          news : {
            ...this.state.news,
            related : data
          }
        })
      })
      .catch(this.failLoadContent);

    /*dispatch({type: GET_NEWS_DETAIL_RELATED, data})*/
  }

  failLoadContent() {
    console.warn('error load');
  }

  render() {
    const { navigator } = this.props;
    const { loader, news } = this.state;
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

export default NewsItemScreen;

