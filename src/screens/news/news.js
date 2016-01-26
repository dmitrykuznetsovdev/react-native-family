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
import ShowcaseItems from '_components/showcase_items';
import ScrollListView from '_components/scroll_list_view';

import { fetchNews, fetchNewsByRubric } from '_actions/news';
import { getRubricsBySlug } from '_actions/common';
import {
  getNewsShowcases,
  fetchNewsRubricShowcases,
  loadMoreShowcase
} from '_actions/showcase';

class NewsScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loader: true,
      isLoadingTail: false
    };
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
    /*let {dispatch, articles } = this.props;
    let {nextPage} = articles;
    if (nextPage) {
      this.setState({isLoadingTail: true})
      dispatch(loadMoreArticles({url: nextPage, params: {page_size: 14}}))
        .then(()=>this.setState({isLoadingTail: false}))
    }*/
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>list news loading...</Text>
      </View>
    )
  }

  render() {
    const { news, navigation_params } = this.props;
    const { loader, isLoadingTail } = this.state;
    const { news_list, title } = news;

    if (loader) {
      return this.renderLoadingView()
    }

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })


    return (
      <View style={styles.container}>
        {news.items.length ?
          <ScrollListView
            dataSource={dataSource.cloneWithRows(news.items)}
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

