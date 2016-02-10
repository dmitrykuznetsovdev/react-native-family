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
import styles from './style';
import ShowcaseItems from '../../components/showcase_items';
import ScrollListView from '../../components/scroll_list_view';
import Loader from '../../components/loader';


import {LookServices} from '../../module_dal/services/look_services';
import {NewsServices} from '../../module_dal/services/news_services';
import {TagsServices} from '../../module_dal/services/tags_services';
import {ShowcaseServices} from '../../module_dal/services/showcase_services';
import {ArticleServices} from '../../module_dal/services/article_services';
import {RubricServices} from '../../module_dal/services/rubric_services';


class ArticlesScreen extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loader: true,
      articles: {
        detail: {},
        related: {},
        items: [],
        title: 'Статьи',
        nextPage: ''
      },
      isLoadingTail: false
    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  }


  componentWillMount() {
    const { navigation_params } = this.props;
    const rubric = navigation_params ? navigation_params.rubric : null;

    if (rubric) {
      this.fetchArticlesRubric(rubric)
        .then(this.hideLoader.bind(this))
      this.getRubricsBySlug('articles', rubric)
    } else {
      this.fetchArticles()
    }
  }

  /**
   * список статей
   */
  fetchArticles() {
    return ArticleServices.getArticles({page_size: 14})
      .then((data)=> {
        const state_art = this.state.articles
        const state     = {
          ...state_art,
          items: [...data.items],
          nextPage: data.page.next
        }

        this.setState({
          articles: state,
          loader: false
        })
      })
      .catch(this.failLoadContent.bind(this));

    //dispatch({type: GET_ARTICLES, data})
  }

  /**
   * список статей по рубрикам и данные самой рубрики
   * @param rubricId
   */
  fetchArticlesRubric(rubricId) {
    let params = {
      rubric: rubricId,
      params: {page_size: 14}
    }

    return ArticleServices.getArticlesByRubric(params)
      .then((data)=> {

      })
      .catch(this.failLoadContent)

    //dispatch(actionArticlesByRubric(data))
  }


  /**
   * догрузка списка статей
   * @param params
   */
  loadMoreArticles(params) {
    return ArticleServices.getArticlesByUrl(params)
      .then((data) => {
        const state_art = this.state.articles
        const state     = {
          ...state_art,
          items: [
            ...state_art.items,
            ...data.items
          ],
          nextPage: data.page.next
        }

        this.setState({
          articles: state,
          loader: false
        })
      })
      .catch(this.failLoadContent);

    //dispatch({type: GET_ARTICLES_MORE, data})
  }

  /**
   * детальная страница статьи
   * @param slug
   */
  getArticleDetail(slug) {

    //dispatch({type: ARTICLES_SHOW_LOADER, loader: true})

    return ArticleServices.getArticleId(slug)
      .then((data)=> {

      })
      .catch(this.failLoadContent);

    //return dispatch({type: GET_ARTICLE_DETAIL, data})
  }


  getArticleRelated(slug) {
    ArticleServices.getArticleRelated(slug)
      .then((data)=> {

      })
      .catch(this.failLoadContent);

    //dispatch({type: GET_ARTICLE_DETAIL_RELATED, data})
  }

  failLoadContent() {
    console.warn('error load');
    this.hideLoader();
  }


  hideLoader() {
    setTimeout(()=> {
      this.setState({loader: false})
    }, 1000);
  }

  _onEndReached() {
    let { articles } = this.state;
    let {nextPage} = articles;
    if (nextPage) {
      this.setState({isLoadingTail: true})

      this.loadMoreArticles({url: nextPage, params: {page_size: 14}})
        .then(()=>this.setState({isLoadingTail: false}))

    }
  }

  render() {
    const { navigation_params } = this.props;
    const { loader, articles, isLoadingTail } = this.state;
    const rubric = navigation_params ? navigation_params.rubric : null;

    if (loader) {
      return <Loader />
    }

    /**
     * находимся на списке статей
     * так же можем находится на списке отдельной рубрики
     * передаем тег рубрики на которой находимся в список ->
     * @params showRubricTag
     */
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{articles.title}</Text>
        </View>
        {!articles.items.length ? null :
          <ScrollListView
            dataSource={this.dataSource.cloneWithRows(articles.items)}
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

export default ArticlesScreen;
