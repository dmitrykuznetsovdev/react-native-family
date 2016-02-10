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
import styles from './style';
import ShowcaseItems from '../../components/showcase_items';
import ScrollListView from '../../components/scroll_list_view';
import Loader from '../../components/loader';

import {NewsServices} from '../../module_dal/services/news_services';
import {TagsServices} from '../../module_dal/services/tags_services';
import {ShowcaseServices} from '../../module_dal/services/showcase_services';
import {RubricServices} from '../../module_dal/services/rubric_services';

/*import { fetchNews, fetchNewsByRubric } from '../../module_dal/actions/news';
 import { getRubricsBySlug } from '../../module_dal/actions/common';
 import {
 getNewsShowcases,
 fetchNewsRubricShowcases,
 loadMoreShowcase
 } from '../../module_dal/actions/showcase';*/

class NewsScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loader: true,
      news: {
        news_list: {
          items: []
        },
        items: [],
        detail: {},
        related: {},
        title: 'Все новости'
      },
      isLoadingTail: false
    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    const { navigation_params } = this.props;
    this._rubric = navigation_params ? navigation_params.rubric : null;
  }

  componentWillMount() {
    //const { dispatch } = this.props;
    this.getNewsData();
  }

  getNewsData() {
    const { navigation_params } = this.props;
    const rubric = navigation_params ? navigation_params.rubric : null;

    // если есть рубрика
    if (rubric) {

      /*dispatch(fetchNewsByRubric(rubric));
       dispatch(getRubricsBySlug('news', rubric));
       dispatch(fetchNewsRubricShowcases());*/

    }
    else {
      this.fetchNews(1)
      //dispatch(getNewsShowcases());
    }
  }

  fetchNews(page, rubric) {
    return NewsServices.getNewsContent(page, rubric)
      .then((data)=> {
        const state     = this.state;
        const news_list = {
          ...state.news.news_list,
          ...data,
          items: [
            ...state.news.news_list.items,
            ...data.items
          ]
        }
        this.setState({
          news: {
            news_list
          }
        })
        this.hideLoader()
      })
      .catch(this.hideLoader.bind(this));
  }

  hideLoader() {
    setTimeout(()=>this.setState({loader: false}), 1000);
  }

  _onEndReached() {
    const { news, navigation_params } = this.state;
    const rubric = navigation_params ? navigation_params.rubric : null;
    const { page, request } = news.news_list;

    if (page.next && page.next.length) {
      let pageNext = Number.parseInt(request.page);
      this.setState({isLoadingTail: true})

      this.fetchNews(pageNext + 1, rubric || '')
        .then(()=> this.setState({isLoadingTail: false}))
        .catch(()=> this.setState({isLoadingTail: false}))
    }
  }

  render() {
    const { news, loader, isLoadingTail } = this.state;
    const { news_list, title } = news;

    if (loader && !news_list.items.length) {
      return <Loader />
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {!news_list.items.length ? null :
          <ScrollListView
            dataSource={this.dataSource.cloneWithRows(news_list.items)}
            renderRow={(props) => <ShowcaseItems {...props} />}
            pageSize={14}
            isLoadingTail={isLoadingTail}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={20}
            showsVerticalScrollIndicator={false}/> }
      </View>
    );
  }
}

export default NewsScreen;
