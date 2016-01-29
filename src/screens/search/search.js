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
import ScrollListView from '/src/components/scroll_list_view';
import CardPreview from '/src/components/card_full/card_preview';
import SearchLine from './search_line';
import Tabs from './tabs';

import {
  fetchTabs,
  fetchSearchQuery,
  fetchContentByTypeTabs,
  fetchDataByPage,
  fetchMoreNews
} from '/src/module_dal/actions/search';

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loader        : true,
      isLoadingTail : false,
      dataSource    : new ListView.DataSource({
        rowHasChanged : (row1, row2) => row1 !== row2
      })
    };

    this._loading = false;
  }

  componentWillMount() {
    const { dispatch } = this.props;
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
    setTimeout(()=>this.setState({loader : false}), 1000);
  }

  _onEndReached() {
    const {search, dispatch} = this.props;
    const {page} = search.query;
    if (page && page.next) {
      this.setState({isLoadingTail : true})
      dispatch(fetchMoreNews(page.next))
        .then(()=> this.setState({isLoadingTail : false}))
        .catch(()=> this.setState({isLoadingTail : false}))
    }
  }

  /**
   * прелоадер
   * @returns {XML}
   */
  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Text style={styles.loader_text}>search loading...</Text>
      </View>
    )
  }

  /**
   * пустой результат
   * @returns {XML}
   */
  emptyResult() {
    return (
      <View style={styles.empty}>
        <Text >По вашему запросу не чего не найдено</Text>
      </View>
    )
  }

  /**
   * прелоадер или рустой результат
   * @returns {*}
   */
  loaderOrEmptyResult() {
    const { searchQuery, query, loader } = this.props.search;
    let templ = loader ? this.renderLoadingView() : null;

    if (!query.items.length && !loader) {
      if (searchQuery.length) {
        templ = this.emptyResult()
      }
    }
    return templ;
  }

  _onTabClick(url) {
    const {search} = this.props;
    if (url.contentType != search.activeTab) {
      this.fetchContentByTypeTabs(url);
    }
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
        .then(()=> this._loading = false)
        .catch(()=> this._loading = false)
    }
  }


  render() {
    const { query, tabs, activeTab } = this.props.search;

    return (
      <View style={styles.container}>
        <View style={styles.flex}>
          <SearchLine  />
          {!tabs.items.length ? null :
            <Tabs tabs={tabs.items}
                  activeTab={activeTab}
                  onTabClick={this._onTabClick.bind(this)}/>
          }
        </View>

        {!query.items.length ? null :
          <ScrollListView
            dataSource={this.state.dataSource.cloneWithRows(query.items)}
            renderRow={(props) => <CardPreview {...props} />}
            pageSize={15}
            isLoadingTail={this.state.isLoadingTail}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={20}
            showsVerticalScrollIndicator={false}
          />}

        {this.loaderOrEmptyResult()}
      </View>
    );
  }
}

export default connect(state => ({
  search : state.search
}))(SearchScreen);

