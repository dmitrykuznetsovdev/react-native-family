import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  LayoutAnimation,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import ShowcaseItems from '_components/showcase_items';
import ScrollListView from '_components/scroll_list_view';


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
      loader: true,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }


  componentWillMount() {
    const { dispatch, navigation_params } = this.props;
    const rubric = navigation_params ? navigation_params.rubric : null;

    if (rubric) {
      dispatch(fetchArticlesRubric(rubric)).then(this.hideLoader.bind(this))
      dispatch(getRubricsBySlug('articles', rubric))
    } else {
      dispatch(fetchArticles())
        .then(this.hideLoader.bind(this))
    }
  }

  hideLoader() {
    setTimeout(()=>this.setState({loader: false}), 1000);
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>mother fucker...</Text>
      </View>
    )
  }

  _onEndReached() {
    let {dispatch, articles } = this.props;
    let {nextPage} = articles;
    if (nextPage) {
      this.setState({isLoadingTail: true})
      dispatch(loadMoreArticles({url: nextPage, params: {page_size: 14}}))
        .then(()=>this.setState({isLoadingTail: false}))
    }
  }

  render() {
    const { articles, navigation_params } = this.props;
    const { loader, isLoadingTail } = this.state;
    const rubric = navigation_params ? navigation_params.rubric : null;

    if (loader) {
      return this.renderLoadingView()
    }

    /**
     * находимся на списке статей
     * так же можем находится на списке отдельной рубрики
     * передаем тег рубрики на которой находимся в список ->
     * @params showRubricTag
     */
    return (
      <View style={styles.container}>
        {!articles.items.length ? null :
          <ScrollListView
            dataSource={this.state.dataSource.cloneWithRows(articles.items)}
            renderRow={(props) => <ShowcaseItems {...props} showRubricTag={rubric} />}
            pageSize={14}
            isLoadingTail={isLoadingTail}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={20}
            showsVerticalScrollIndicator={false}
          />}
      </View>
    );
  }
}

export default connect(state => ({
  articles: state.articles
}))(ArticlesScreen);
