import React, {
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native';
import {connect} from 'react-redux';
import Link from '_components/link';
import _ from 'lodash';
import styles from './style';

import { NAVIGATOR_CHANGE } from '_actions/actions';

const menu_list = [
  {
    to: null,
    screenId: 'index_screen',
    title: 'Главная',
    name: 'Главная'
  },
  {
    to: null,
    screenId: 'articles',
    title: 'Статьи',
    name: 'Статьи'
  },
  {
    to: null,
    screenId: 'news',
    title: 'Новости',
    name: 'Новости'
  }
]


const Menu = (props) => {
  const { navigator } = props;
  const dataNavigator = navigator.data;

  return (
    <View style={styles.menu}>
      <Text style={styles.title}>Меню</Text>
      <Text>{''}</Text>

      {menu_list.map((item, i)=> {
        const styl = item.screenId == dataNavigator.routeId ?
          styles.item_active :
          styles.item;

        return (
          <Link {...item} key={i}>
            <Text style={styl}>{item.name}</Text>
          </Link>
        )
      })}
    </View>
  )
}

export default connect(state => ({
  navigator: state.navigator
}))(Menu);
