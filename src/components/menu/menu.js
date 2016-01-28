import React, {
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native';
import {connect} from 'react-redux';
import Link from '_components/link';
import _ from 'lodash';
import {EventManager} from '_app/event_manager';
import styles from './style';

import { NAVIGATOR_CHANGE } from '_actions/actions';

const menu_list = [
  {
    to: 'index_screen',
    title: 'Главная',
    name: 'Главная'
  },
  {
    to: 'articles',
    title: 'Статьи',
    name: 'Статьи'
  },
  {
    to: 'news',
    title: 'Новости',
    name: 'Новости'
  },
  {
    to: 'search',
    title: 'Поиск',
    name: 'Поиск'
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
        const styl = item.to == dataNavigator.routeId ?
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
