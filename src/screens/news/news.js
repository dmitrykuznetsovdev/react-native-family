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
import ShowcaseItems from '../../components/showcase_items';
import ScrollListView from '../../components/scroll_list_view';

import { fetchNews, fetchNewsByRubric } from '../../module_dal/actions/news';
import { getRubricsBySlug } from '../../module_dal/actions/common';
import {
  getNewsShowcases,
  fetchNewsRubricShowcases,
  loadMoreShowcase
} from '../../module_dal/actions/showcase';

class NewsScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loader: true,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };

    const { navigation_params } = this.props;
    this._rubric = navigation_params ? navigation_params.rubric : null;
  }

  componentWillMount() {
    const { dispatch } = this.props;
    this.getNewsData();
  }

  getNewsData() {
    const { dispatch, navigation_params } = this.props;
    const rubric = navigation_params ? navigation_params.rubric : null;

    // если есть рубрика
    if (rubric) {

      dispatch(fetchNewsByRubric(rubric));
      dispatch(getRubricsBySlug('news', rubric));
      dispatch(fetchNewsRubricShowcases());

    }
    else {
      dispatch(fetchNews(1))
        .then(this.hideLoader.bind(this))

      dispatch(getNewsShowcases());
    }
  }

  hideLoader() {
    setTimeout(()=>this.setState({loader: false}), 1000);
  }

  _onEndReached() {
    const {dispatch, news, navigation_params } = this.props;
    const rubric = navigation_params ? navigation_params.rubric : null;
    const { page, request } = news.news_list;

    if (page.next && page.next.length) {
      let pageNext = Number.parseInt(request.page);
      this.setState({isLoadingTail: true})

      dispatch(fetchNews(pageNext + 1 , rubric || ''))
        .then(()=> {
          this.setState({isLoadingTail: false})
        })
        .catch(()=> {
          this.setState({isLoadingTail: false})
        })

    }
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>list news loading...</Text>
      </View>
    )
  }

  render() {
    const { news } = this.props;
    const { loader, isLoadingTail } = this.state;
    const { news_list, title } = news;

    if (loader && !news_list.items.length) {
      return this.renderLoadingView()
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {news_list.items.length ?
          <ScrollListView
            dataSource={this.state.dataSource.cloneWithRows(news_list.items)}
            renderRow={(props) => <ShowcaseItems {...props} />}
            pageSize={14}
            isLoadingTail={isLoadingTail}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={20}
            showsVerticalScrollIndicator={false}
          />
          : null}
      </View>
    );
  }
}

export default connect(state => ({
  news: state.news,
  showcases: state.showcase
}))(NewsScreen);

