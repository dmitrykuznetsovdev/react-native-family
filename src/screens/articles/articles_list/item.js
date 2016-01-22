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
import styles from './style';

class Item extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  _pressRow(id) {
    const {pressRow} = this.props;
    pressRow(id);
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
    const {main_image, main_tag, title, id} = this.props;
    const image = main_image && main_image.image_url ? main_image.image_url : '';

    return (
      <TouchableHighlight style={styles.marginBottomItem}
                          onPress={() => this._pressRow(id)}>
        <View style={styles.containerArticle}>
          <Image
            source={{uri: image}}
            style={styles.thumbnail}/>

          <View style={styles.rightContainer}>
            <Text style={styles.tags}>
              {main_tag.title.toUpperCase()}
            </Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Item;
