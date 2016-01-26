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
import Item from './item';
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
      isLoadingTail: false
    };
  }


  componentWillMount() {
    const { dispatch, navigation_params } = this.props;
    if (navigation_params && navigation_params.rubric) {
      dispatch(fetchArticlesRubric(navigation_params.rubric))
        .then(this.hideLoader.bind(this))
      dispatch(getRubricsBySlug('articles', id))
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
    const { articles } = this.props;
    const { loader, isLoadingTail } = this.state;

    if (loader) {
      return this.renderLoadingView()
    }

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })


    return (
      <View style={styles.container}>
        {articles.items.length ?
          <ScrollListView
            dataSource={dataSource.cloneWithRows(articles.items)}
            renderRow={(props) => <Item {...props} />}
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
  articles: state.articles
}))(ArticlesScreen);
