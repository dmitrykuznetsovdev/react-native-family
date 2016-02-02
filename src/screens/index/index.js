import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux/native';
import styles from './style';
import Loader from '../../components/loader';

class IndexScreen extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loader: true
    };
  }


  componentWillMount() {

  }


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.loader}>INDEX</Text>
        <Loader />
      </View>
    );
  }
}

export default connect(state => ({

}))(IndexScreen);
