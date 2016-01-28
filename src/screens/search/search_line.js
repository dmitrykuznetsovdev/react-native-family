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

import { SEARCH_RESET_PREDICATES } from '_actions/actions'
import { fetchTabs, fetchSearchQuery } from '_actions/search';

class SearchLine extends Component {
  constructor(props, context) {
    super(props, context);

    this.state    = {
      text: '',
      saveText: ''
    };
    this._loading = false;
  }

  componentWillMount() {
    const { dispatch } = this.props;
  }

  _onSearch() {

    const { dispatch, search } = this.props;
    const {text, saveText} = this.state;
    this._loading = true;

    if (text && text.length && text !== saveText) {
      this.state = {
        ...this.state,
        saveText: text
      }

      const searchText = encodeURIComponent(text);

      Promise.all([
          dispatch(fetchTabs(searchText, '')),
          dispatch(fetchSearchQuery('', searchText))
        ])
        .then(() => {
          this._loading = false
        })
        .catch(()=> {
          this._loading = false
        })
    }
  }


  render() {
    const { search, navigation_params } = this.props;

    return (
      <View style={styles.search_line}>
        <TextInput
          style={styles.input}
          ref={(c) => this._input = c}
          placeholder="поищи какое нибудь говно"
          placeholderTextColor="gray"
          onSubmitEditing={this._onSearch.bind(this)}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>

        <TouchableOpacity style={[styles.search_icon]} onPress={this._onSearch.bind(this)}>
          <Icon name="search" style={stylesBase.crumbIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({
  search: state.search
}))(SearchLine);

