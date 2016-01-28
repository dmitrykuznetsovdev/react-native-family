import React, {
  Text,
  View,
  Image,
  Component
} from 'react-native';
import _ from 'lodash';

import HTMLView from 'react-native-htmlview';
import Link  from '_components/link';
import Filters from '_utils/filters';
import styles, {htmlViewStyle} from './style';

const CardPreview = (props) => {

  const {content_type, main_tag, title, slug, id, pub_date} = props;
  let contentType  = (content_type === 'article') ? 'articles' : content_type;
  let mainTagSlug  = (main_tag) ? main_tag.slug : 'notag';
  let mainTagTitle = (main_tag) ? main_tag.title : '';
  let announce     = props.announce || '';

  const navigateTo = {
    to: contentType,
    mainTagSlug,
    slug,
    id
  };

  function onRedirectInRubric() {
    var contentType = (content_type === 'article') ? 'articles' : content_type;
    return {
      to: contentType,
      contentType,
      rubric: mainTagSlug
    }
  }

  console.log(title);

  return (
    <View style={styles.marginBottomItem}>

      <Link {...navigateTo} style={styles.card}>
        <View style={styles.inf}>
          {content_type == 'news' ? Filters.getDateLongFormat(pub_date) || "" : null}
          {content_type != 'news' ?
            <Link {...onRedirectInRubric}>
              <Text style={styles.main_tag}> { mainTagTitle || '' } </Text>
            </Link> : null}
        </View>
        <Text style={styles.title}>{title}</Text>
        {announce.length ?
          <View style={styles.announce}>
            <HTMLView
              value={announce}
              stylesheet={htmlViewStyle}/>
          </View> : null}
      </Link>
    </View>
  )
}

CardPreview.defaultProps = {
  title: '',
  announce: '',
  main_tag: {
    title: '',
    slug: ''
  }
}


export default CardPreview;
