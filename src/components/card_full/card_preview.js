import React, {
  Text,
  View,
  Image,
  Component
} from 'react-native';
import _ from 'lodash';

import HTMLView from 'react-native-htmlview';
import Link  from '/src/components/link';
import Filters from '/src/utils/filters';
import styles, {htmlViewStyle} from './style';

const CardPreview = (props) => {

  const {content_type, main_tag, title, slug, id} = props;
  const contentType  = (content_type === 'article') ? 'articles' : content_type;
  const screen = (content_type === 'article') ? 'articles_item': 'news_item';
  const mainTagSlug  = (main_tag) ? main_tag.slug : 'notag';
  const mainTagTitle = (main_tag) ? main_tag.title : '';
  const announce     = props.announce || '';
  const pub_date = Filters.getDateLongFormat(props.pub_date)

  const navigateTo = {
    to: screen,
    screenId : screen,
    mainTagSlug,
    slug,
    id
  };

  function onRedirectInRubric() {
    return {
      to: screen,
      screenId : screen,
      contentType,
      rubric: mainTagSlug
    }
  }

  return (
    <View style={styles.marginBottomItem}>

      <Link {...navigateTo} style={styles.card}>
        <View style={styles.inf}>

          {content_type != 'news' ? null :
            <Text style={styles.main_tag}>{pub_date}</Text>}

          {content_type == 'news' ? null :
            <Link {...onRedirectInRubric}>
              <Text style={styles.main_tag}> { mainTagTitle || '' } </Text>
            </Link>}
        </View>

        <Text style={styles.title}>{title}</Text>

        {!announce.length ? null :
          <View style={styles.announce}>
            <HTMLView
              value={announce}
              stylesheet={htmlViewStyle}/>
          </View>}

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
