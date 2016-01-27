import React, {
  Platform,
  PanResponder,
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

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
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
    evt                = evt.nativeEvent;
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
        {...this._panResponder.panHandlers}
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
