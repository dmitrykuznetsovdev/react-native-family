import React, {
  Text,
  View,
  Image,
  ScrollView,
  Component
} from 'react-native';
import _ from 'lodash';
import styles, {htmlViewStyle} from './style';
import UrlParse from 'url';
import HTMLView from 'react-native-htmlview';
import Filters from '/src/utils/filters';
import Link from '/src/components/link';

import {
  MainTag,
  Info,
  ImageDetail,
  Tags,
  Matherials,
  RelatedTag
} from './card_full_parts';

class CardFull extends Component {

  componentDidMount() {
    setTimeout(()=> {
      /*ReactDOM.render(<RelatedTag {...this.props} />, document.querySelector('#RelatedTag'));*/
    }, 1000)
  }

  _onRedirectToFeed(link) {
    //console.log(link, 'link');
  }

  /**
   * парсим url, елси ссылка на внутренний контент, то делаем редирект
   * на нужный screen
   * если ссылка на внешний контент, то рисуем отдельно в WebView
   *
   * @param url
   * @private
   */
  _navigatingTo(url) {
    const { navigator } = this.props;
    const url_link       = UrlParse.parse(url, true);
    const isFamily       = url_link.host.indexOf('family') != -1 ? true : false;
    let content_type     = '';
    let rubric           = '';
    let slug             = '';
    let navigator_screen = 'web_view';

    if (isFamily) {
      let parsePath = _.compact(url_link.path.split('/'))
      if (parsePath.length) {
        content_type = parsePath[0];
        rubric       = parsePath[1];
        slug         = parsePath[2];

        // удаляем в конце урла id статьи
        slug = (content_type == 'articles') ?
          _.dropRight(slug.split('-')).join('-') :
          slug;

        navigator_screen = (content_type == 'articles') ?
          'articles_item' : 'news_item';
      }
    }

    const data_navigate = {
      url: url,
      content_type,
      rubric,
      slug,
      to: navigator_screen
    }

    navigator.push({
      id: navigator_screen,
      navigation_params: data_navigate
    })
  }

  render() {
    const { content_type, announce, text, title, feed } = this.props;


    return (
      <View style={styles.card_full}>
        <ScrollView style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>

          <MainTag {...this.props} />

          <Text style={styles.title}>{title}</Text>

          <Info {...this.props} />

          <View style={styles.announce}>
            <HTMLView
              value={announce}
              stylesheet={htmlViewStyle}/>
          </View>

          <ImageDetail {...this.props} />


          <View style={styles.text}>
            <HTMLView
              value={text}
              onLinkPress={(url) => this._navigatingTo(url)}
              stylesheet={htmlViewStyle}
            />
          </View>

          {(content_type === 'news' && feed) ?
            <View>
              <Text>Источник:</Text>
              <Text onPress={() => this._onRedirectToFeed(link)}>{feed.title}</Text>
            </View> : null }

          <Tags {...this.props} />

          <Matherials {...this.props} />

        </ScrollView>
      </View>
    )
  }
}




CardFull.defaultProps = {
  title: '',
  announce: '',
  main_tag: {
    title: '',
    slug: ''
  },
  main_author: {
    title: ''
  },
  main_image: {
    image_url: '',
    license: ''
  },
  tags: [],
  link: '',
  age: '',
  content_type: "",
  feed: '',
  media: '',
  original_author: '',
  properties: [],
  pub_date: '',
  related_api_urls: {},
  seo: {},
  slug: '',
  text: '',
  related: {
    item: {
      materials: [],
      read: []
    }
  },
  id: ''
}

export default CardFull;
