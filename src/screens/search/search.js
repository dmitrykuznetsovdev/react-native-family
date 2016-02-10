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
import ScrollListView from '../../components/scroll_list_view';
import CardPreview from '../../components/card_full/card_preview';
import SearchLine from './search_line';
import Tabs from './tabs';
import Loader from '../../components/loader';
import {SearchServices} from '../../module_dal/services/search_services';

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: {
        tabs: {
          items: []
        },
        query: {
          items: []
        },
        predicates: [],
        searchQuery: '',
        activeTab: ''
      },
      loader: false,
      isLoadingTail: false
    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this._loading   = false;
  }

  componentWillMount() {

  }


  _onSearch(text) {
    this._loading = true;
    this.setState({loader: true})
    Promise.all([
        this.fetchTabs(text, ''),
        this.fetchSearchQuery('', text)
      ])
      .then(this.hideLoader.bind(this))
      .catch(this.hideLoader.bind(this))
  }

  hideLoader() {
    setTimeout(()=> {
      this.setState({loader: false})
      this._loading = false
    }, 500);
  }

  /**
   * получаем tab
   * @param query
   * @param tab
   * @returns {Promise.<T>|*}
   */
  fetchTabs(query, tab) {
    return SearchServices.getSearchTabs(query)
      .then((data)=> {
        const search         = this.state.search;
        const search_content = {
          ...search,
          activeTab: tab || 'content',
          tabs: {
            ...search.tabs,
            ...data
          }
        }
        this.setState({search: search_content})
      })
  }

  /**
   * поиск
   * @param tab
   * @param query
   * @returns {Promise.<T>|*}
   */
  fetchSearchQuery(tab, query) {
    let data_query = {
      tab: tab || 'content',
      query: query || ''
    }

    return SearchServices
      .getContentByType(data_query.tab, data_query.query)
      .then((data)=> {
        const search         = this.state.search;
        const search_content = {
          ...search,
          searchQuery: data_query.query || '',
          query: {
            ...search.query,
            ...data
          }
        }
        this.setState({search: search_content})
      })
  }


  getSearchByUrl(params) {
    this.setState({loader: true})
    this._loading = true;
    return SearchServices.getSearchByUrl(params.url)
      .then((data)=> {
        const search       = this.state.search;
        const search_state = {
          ...search,
          activeTab: params.activeTab,
          query: {
            ...search.query,
            ...data
          }
        }
        this.setState({search: search_state})
        this.hideLoader()
      })
      .catch(this.hideLoader.bind(this))
  }

  /**
   * данные по типу контента
   * { все результаты, новости, статьи }
   *
   * @param params
   */
  _onTabClick(params) {
    const {search} = this.state;
    if (params.contentType != search.activeTab) {
      if (!this._loading) {
        this.getSearchByUrl({
          url : params.url,
          activeTab: params.contentType
        })
      }
    }
  }

  _onEndReached() {
    const { search } = this.state;
    const {page} = search.query;
    if (page && page.next) {
      this.setState({isLoadingTail: true})

      SearchServices.getSearchByUrl(page.next)
        .then((data)=> {
          const search         = this.state.search;
          const search_content = {
            ...search,
            query: {
              ...search.query,
              ...data,
              items: [
                ...search.query.items,
                ...data.items
              ]
            }
          }
          this.setState({
            search: search_content,
            isLoadingTail: false
          })
        })
        .catch(()=> this.setState({isLoadingTail: false}))
    }
  }

  /**
   * прелоадер
   * @returns {XML}
   */
  renderLoadingView() {
    return (
      <View style={styles.loader}>
        <Loader />
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
    const { search, loader } = this.state;
    const { searchQuery, query } = search
    let templ = loader ? this.renderLoadingView() : null;

    if (!query.items.length && !loader) {
      if (searchQuery.length) {
        templ = this.emptyResult()
      }
    }
    return templ;
  }


  render() {
    const { query, tabs, activeTab } = this.state.search;

    return (
      <View style={styles.container}>
        <View style={styles.flex}>
          <SearchLine _onSearch={this._onSearch.bind(this)}/>
          {!tabs.items.length ? null :
            <Tabs tabs={tabs.items}
                  activeTab={activeTab}
                  onTabClick={this._onTabClick.bind(this)}/>
          }
        </View>

        {!query.items.length ? null :
          <ScrollListView
            dataSource={this.dataSource.cloneWithRows(query.items)}
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

export default SearchScreen;

