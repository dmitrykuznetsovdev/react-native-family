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
import {connect} from 'react-redux/native';
import Link from '../../components/link';
import Filters from '../../utils/filters';
import {imageTemplateCrop} from '../../utils/utils';

import styles from './style';

class ShowcaseItems extends Component {

  constructor(props, context) {
    super(props, context);
  }

  filterTitle() {
    return Filters.filterTextOverflow(this.props.title, 60);
  }

  /**
   * отличается формирование урлов для разных типов контента
   * для статей это  -- /articles/tag/slug-id
   * для новостей это -- /news/tag/id
   * @returns {String}
   */
  createPathForLink() {
    const {content_type, main_tag, slug, id} = this.props;
    const type   = content_type == 'article' ? 'articles' : content_type;
    const screen = (content_type === 'article') ? 'articles_item' : 'news_item';
    const tag    = (main_tag) ? main_tag.slug : 'notag';

    return {
      to: screen,
      slug,
      tag,
      type,
      id
    }
  }

  mainTag() {
    const {main_tag, content_type } = this.props;
    const screen      = (content_type === 'article') ? 'articles' : 'news';

    const url = {
      to: screen,
      slug : main_tag.slug,
      rubric : main_tag.slug
    }

    return (main_tag ?
        <Link {...url}>
          <Text style={styles.tags}>{main_tag.title.toUpperCase()}</Text>
        </Link>
        : this.tags()
    )
  }

  tags() {
    const {tags} = this.props;
    return (
      <View>
        {tags.map((item, i)=> {
          return (
            <Text style={styles.tags} key={i}>
              {item.title.toUpperCase()}
              { (i !== tags.length - 1) ? ', ' : '' }
            </Text>
          )
        })}
      </View>
    )
  }

  rubricTag() {
    let {main_tag, tags, showRubricTag, content_type} = this.props;
    const contentType = (content_type == 'article') ? 'articles' : content_type;
    const screen      = (content_type == 'article') ? 'articles_item' : 'news_item';

    if (main_tag.slug == showRubricTag) {
      return this.mainTag();
    }

    return (
      <View>
        {tags.map((item, i)=> {
          let url = `/${contentType}/${item.slug}`;
          return (item.slug === showRubricTag) ? (
            <Link to={url} screenId={screen} key={i}>
              <Text style={styles.tags}>{item.title.toUpperCase()}</Text>
            </Link>
          ) : null
        })}
      </View>
    )
  }

  tagTmpl() {
    return this.props.showRubricTag ? this.rubricTag() : this.mainTag();
  }

  /**
   * размер картинки в зависимости от типа карточки
   * если не пришел шаблон main_image.image_url_template,
   * то возаращаем main_image.image_url
   *
   * @returns {*}
   */
  getImageUrl() {
    let { main_image } = this.props;
    return imageTemplateCrop({
      size: 'LOW',
      main_image
    });
  }

  render() {
    return (
      <View style={styles.marginBottomItem}>
        <Link {...this.createPathForLink()} style={styles.item}>
          <Image source={{uri: this.getImageUrl()}} style={styles.thumbnail}/>

          <View style={styles.rightContainer}>
            {this.tagTmpl()}
            <Text style={styles.title}>{this.filterTitle()}</Text>
          </View>
        </Link>
      </View>
    );
  }
}

export default ShowcaseItems;
