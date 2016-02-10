import React, {
  Text,
  View,
  WebView,
  ScrollView,
  Component
} from 'react-native';
import styles from './style';
import Filters from '../../utils/filters';


class WebViewScreen extends Component {

  componentDidMount() {

  }

  render() {
    let { navigation_params } = this.props;


    return (
      <View style={styles.container}>
        <WebView
          url={navigation_params.url}
          automaticallyAdjustContentInsets={false}
          onLoad={(data) => { console.log(data, 'onLoad'); }}
          onLoadStart={(data) => { console.log(data, 'onLoadStart'); }}
          onLoadEnd={(data) => { console.log(data, 'onLoadEnd'); }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          style={styles.web_view} />
      </View>
    )
  }
}

export default WebViewScreen;
