import React, {
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native';
import Link from '_components/link';
import styles from './style';

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
  const { active } = props;
  return (
    <View style={styles.menu}>
      <Text style={styles.title}>Меню</Text>
      <Text>{''}</Text>

      {menu_list.map((item, i)=> {
        const styl = item.screenId == active ?
          styles.item_active :
          styles.item;

        return (
          <Link {...item} key={i}>
            <Text style={styl}>item menu</Text>
          </Link>
        )
      })}
    </View>
  )
}

export default Menu;
