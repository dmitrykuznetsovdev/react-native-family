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
import Link from '_components/link';
import styles from './style';

class Item extends Component {

  constructor(props, context) {
    super(props, context);
  }

  mainTag() {
    const {main_tag} = this.props;
    return (main_tag ?
        <span className="showcase-tags">
          {main_tag.title.toUpperCase()}
        </span>
        : this.tags()
    )
  }

  tags() {
    const {tags} = this.props;
    return (
      <div>
        {tags.map((item, i)=> {
          return (
            <span className="showcase-tags" key={i}>
              {item.title.toUpperCase()}
              { (i !== tags.length - 1) ? ', ' : '' }
            </span>
          )
        })}
      </div>
    )
  }

  rubricTag() {
    let {main_tag, tags, showRubricTag} = this.props;
    const showTag = showRubricTag;
    return (
      <div>
        {main_tag.slug === showTag ? this.mainTag() : tags.map((item, i)=> {
          return (item.slug === showTag) ? (
            <span className="showcase-tags" key={i}>
              {item.title.toUpperCase()}
            </span>
          ) : null
        })}
      </div>
    )
  }

  render() {
    const {main_image, main_tag, title, id, slug} = this.props;
    const image = main_image && main_image.image_url ? main_image.image_url : '';

    return (
      <View style={styles.marginBottomItem}>
        <Link to={slug} screenId="articles_item" style={styles.containerArticle}>
          <Image source={{uri: image}} style={styles.thumbnail}/>

          <View style={styles.rightContainer}>
            <Text style={styles.tags}>
              {main_tag.title.toUpperCase()}
            </Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Link>
      </View>
    );
  }
}

export default Item;
