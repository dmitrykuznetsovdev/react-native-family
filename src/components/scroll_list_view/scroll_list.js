import React, {
  Platform,
  Text,
  View,
  ListView,
  ScrollView,
  ActivityIndicatorIOS,
  Component
} from 'react-native';
import styles from './style';


/**
 *
 */
class ScrollListView extends Component {

  constructor(props, context) {
    super(props, context);
  }

  /**
   *
   * @private
   */
  _onEndReached() {
    let { onEndReached } = this.props;
    onEndReached()
  }

  /**
   *
   * @returns {*}
   */
  renderFooter() {
    const { renderFooter, isLoadingTail } = this.props;

    if (renderFooter) {
      renderFooter()
      return null;
    }

    if (!isLoadingTail) {
      return null;
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={styles.scrollSpinner}/>;
    }
  }

  /**
   *
   * @param e
   * @private
   */
  _onScrollHandler(evt) {
    const { isLoadingTail } = this.props;
    evt = evt.nativeEvent;
    const scrollTarget = evt.contentSize.height - evt.layoutMeasurement.height;
    const curScroll    = evt.contentOffset.y;

    if (scrollTarget > 0 && curScroll > scrollTarget && !isLoadingTail) {
      this._onEndReached();
    }
  }

  /**
   *
   * @returns {XML}
   */
  renderScrollComponent() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={null}
        onScroll={this._onScrollHandler.bind(this)}
        scrollEventThrottle={1}
        automaticallyAdjustContentInsets={true}
        directionalLockEnabled={true}/>
    )
  }


  /**
   *
   * @returns {XML}
   */
  render() {
    const {
            renderRow,
            dataSource,
            pageSize,
            onEndReachedThreshold,
            showsVerticalScrollIndicator
            } = this.props;

    return (
      <ListView
        dataSource={dataSource}
        renderRow={renderRow}
        renderScrollComponent={this.renderScrollComponent.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        pageSize={pageSize}
        onEndReachedThreshold={onEndReachedThreshold}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      />
    );
  }

}

export default ScrollListView;
