import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ActivityIndicatorIOS,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import Item from './item';


import {
  fetchArticles,
  fetchArticlesRubric,
  loadMoreArticles
} from '_actions/articles';

import {
  getRubricsBySlug
} from '_actions/common';

class ArticlesList extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoadingTail: false
    };
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


  renderFooter() {
    if (!this.state.isLoadingTail) {
      return null;
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={styles.scrollSpinner}/>;
    }
  }

  onPressRow(id){
    const { navigator } = this.props;
    navigator.push({ id : 'articles_item' })
  }

  render() {
    const { articles } = this.props;

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    return (
      <ListView
        dataSource={dataSource.cloneWithRows(articles.items)}
        renderRow={(props) => <Item {...props} pressRow={this.onPressRow.bind(this)} />}
        renderFooter={this.renderFooter.bind(this)}
        onEndReachedThreshold={20}
        onEndReached={this._onEndReached.bind(this)}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default connect()(ArticlesList);
