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
import ScrollListView from '_components/scroll_list_view';
import CardPreview from '_components/card_full/card_preview';
import SearchLine from './search_line';

import {
  fetchTabs,
  fetchSearchQuery,
  fetchContentByTypeTabs,
  fetchDataByPage
} from '_actions/search';

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loader: true,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };

    this._loading = false;
  }

  componentWillMount() {
    const { dispatch } = this.props;

    Promise.all([
        dispatch(fetchTabs('папа', '')),
        dispatch(fetchSearchQuery('', 'папа'))
      ])
      .then(() => {
        this._loading = false
      })
      .catch(()=> {
        this._loading = false
      })
  }

  /**
   * данные по типу контента
   * { все результаты, новости, статьи }
   *
   * @param params
   */
  fetchContentByTypeTabs(params) {
    if (!this._loading) {
      const { dispatch } = this.props;
      const url         = params.url;
      const contentType = params.contentType;
      this._loading     = true;
      dispatch(fetchContentByTypeTabs(url, contentType))
        .then(() => this._loading = false)
        .catch(()=> this._loading = false)
    }
  }

  hideLoader() {
    setTimeout(()=>this.setState({loader: false}), 1000);
  }

  _onEndReached() {
    const {search, dispatch} = this.props;
    const {activeTab, searchQuery} = search;
    //dispatch(fetchDataByPage(activeTab, searchQuery, page))
  }

  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text>search loading...</Text>
      </View>
    )
  }

  render() {
    const { search, navigation_params } = this.props;

    console.log(search.query.items);

    return (
      <View style={styles.container}>
        <View style={styles.flex}>
          <SearchLine  />
        </View>
        <View style={styles.wrapper}>
          {!search.query.items.length ? null :
            <ScrollListView
              dataSource={this.state.dataSource.cloneWithRows(search.query.items)}
              renderRow={(props) => <CardPreview {...props} />}
              pageSize={10}
              isLoadingTail={this.state.isLoadingTail}
              onEndReached={this._onEndReached.bind(this)}
              onEndReachedThreshold={20}
              showsVerticalScrollIndicator={false}
            />}
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  search: state.search
}))(SearchScreen);

