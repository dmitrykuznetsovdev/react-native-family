import React, {
  Platform,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ListView,
  Component,
  PropTypes
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import styles from './style';
import stylesBase from '_app/styles/base';

class SearchLine extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;

  }


  render() {
    const { search, navigation_params } = this.props;

    return (
      <View style={styles.search_line}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 1}}
          placeholder="поищи какое нибудь говно"
          placeholderTextColor="gray"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text} />

        <TouchableOpacity style={[styles.search_icon]}>
          <Icon name="search" style={stylesBase.crumbIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({
  search: state.search
}))(SearchLine);

