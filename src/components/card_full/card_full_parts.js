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
import Filters from '../../utils/filters';
import Link from '../../components/link';


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const MainTag = (props) => {
  const {content_type, main_tag} = props;
  const contentType = (content_type === 'article') ? 'articles' : 'news';
  const screen      = (content_type === 'article') ? 'articles_item' : 'news_item';
  const nav         = {
    to: screen,
    slug : main_tag ? main_tag.slug : '',
    title : main_tag.title,
    contentType
  }

  return (main_tag ?
      <Link {...nav}>
        <Text style={styles.main_tag}>{main_tag.title}</Text>
      </Link> : null
  )
}

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export const Info = (props) => {
  const {main_author, pub_date} = props;
  return (
    <View style={styles.inf}>
      <Text style={styles.data}>
        {main_author ? main_author.title : ''}
        <Text>{' '}</Text>
        {Filters.fromNow(pub_date) ? `${Filters.fromNow(pub_date)}, ${Filters.formatTime(pub_date)}` :
          Filters.getDateLongFormat(pub_date)}
      </Text>
    </View>
  )
}

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export const ImageDetail = (props) => {
  const {main_image} = props;

  return (
    <View style={styles.img}>
      {main_image ?
        <Image source={{uri: main_image.image_url}}
               resizeMode="cover"
               style={styles.thumbnail}/> : null}

      {main_image && main_image.license ?
        <Text style={styles.img_license}>Фото: {main_image.license}</Text> : null}
    </View>
  )
}


/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export const Tags = (props) => {

  const {tags, content_type} = props;
  const contentType = (content_type === 'article') ? 'articles' : 'news';
  const screen      = (content_type === 'article') ? 'articles_item' : 'news_item';

  return (
    <View style={styles.tags}>
      <Text>{(tags.length > 0) ? 'Темы: ' : ''}</Text>

      {tags.map((item, i)=> {
        const nav = {
          to: screen, contentType, slug: item.slug
        }
        return (
          <Link {...nav} style={styles.tag_txt} key={i}>
            <Text>{item.title} { (i !== tags.length - 1) ? ',' : '' }</Text>
          </Link>
        )
      })}
    </View>
  )
}

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export const Matherials = (props) => {

  const {content_type, related} = props;
  const contentType = (content_type === 'article') ? 'articles' : 'news';

  if (!related.item || !related.item.materials.length) {
    return <Text></Text>
  }

  /**
   *
   * @param item
   * @returns {{url: {to: string, contentType: *, slug: string, id: string, tagSlug: *}, tagTitle: *, contentTitle: string}}
   */
  function prepareData(item) {
    const contentType  = (item.content.content_type === 'article') ? 'articles' : item.content.content_type;
    const contentSlug  = (item.content) ? item.content.slug : '';
    const screen       = (contentType === 'articles') ? 'articles_item' : 'news_item';
    const contentTitle = (item.content) ? item.content.title : '';
    const contentId    = (item.content) ? item.content.id : '';
    let tagSlug;
    let tagTitle;

    if (content_type === 'article') {
      tagSlug  = (item.tag) ? item.tag.slug : 'notag';
      tagTitle = (item.tag) ? item.tag.title : ''
    } else {
      tagSlug  = (item.content) ? item.content.main_tag.slug : '';
      tagTitle = (item.content) ? item.content.main_tag.title : '';
    }
    const url = {
      to: screen,
      contentType,
      slug: contentSlug,
      id: contentId,
      tagSlug
    }

    return {
      url, tagTitle, contentTitle
    }
  }

  return (
    <View style={styles.materials}>
      <Text style={styles.materials_title}>
        {contentType === 'articles' ? 'Интересное по теме:' : 'Читайте также'}
      </Text>
      {related.item.materials.map((item, i)=> {
        const {url, tagTitle, contentTitle} = prepareData(item);
        return (
          <View style={styles.materials_item} key={i}>
            <Link {...url}>
              <Text style={styles.materials_item_tag}>{tagTitle}</Text>
            </Link>
            <Link {...url}>
              <Text style={styles.materials_item_title}>{contentTitle}</Text>
            </Link>
          </View>
        )
      })}
    </View>
  )
}


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const RelatedTag = (props)=> {

  const {related} = props;

  function createUrl(item) {
    const contentType = (item.content.content_type === 'article') ? 'articles' : item.content.content_type;
    const url         = (contentType === 'articles') ?
      `/${contentType}/${item.tag.slug}/${item.content.slug}-${item.content.id}` :
      `/${contentType}/${item.tag.slug}/${item.content.id}`;
    return url;
  }

  let title = 'Популярное по теме:';
  return (related.item && related.item.read.length ?
    <View style={styles.reads}>
      <Text> {title} </Text>
      <View>
        {props.related.item.read.map((item, i)=> {
          return (
            <Link to={createUrl(item)} style={styles.reads_title} key={i}>
              <Text>{item.content.title}</Text>
            </Link>
          )
        })}
      </View>
    </View> : null)
}
