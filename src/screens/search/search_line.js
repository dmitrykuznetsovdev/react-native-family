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
import styles from './style';
import stylesBase from '../../styles/base';

class SearchLine extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: '',
      saveText: ''
    };
  }


  _onSearch() {
    const {text, saveText} = this.state;

    if (text && text.length && text !== saveText) {
      this.state = {
        ...this.state,
        saveText: text
      }

      this.props._onSearch(text)
    }
  }


  render() {
    return (
      <View style={styles.search_line}>
        <TextInput
          style={styles.input}
          ref={(c) => this._input = c}
          placeholder="поищи что-нибудь..."
          placeholderTextColor="gray"
          onSubmitEditing={this._onSearch.bind(this)}
          autoFocus={true}
          keyboardType="default"
          maxLength={100}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>

        <TouchableOpacity style={[styles.search_icon]} onPress={this._onSearch.bind(this)}>
          <Icon name="search" style={[stylesBase.crumbIcon, {color: '#000'}]}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SearchLine;
