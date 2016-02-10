import React, {
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native';
import _ from 'lodash';

import Link from '../../components/link';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import { NAVIGATOR_CHANGE } from '../../module_dal/actions/actions';
import { EventManager } from '../../event_manager';

const menu_list = [
  {
    to: 'index_screen',
    title: 'Главная',
    name: 'Главная',
    icon : 'home'
  },
  {
    to: 'articles',
    title: 'Статьи',
    name: 'Статьи',
    icon : 'star'
  },
  {
    to: 'news',
    title: 'Новости',
    name: 'Новости',
    icon : 'newspaper-o'
  },
  {
    to: 'search',
    title: 'Поиск',
    name: 'Поиск',
    icon : 'search'
  }
]


class Menu extends Component {

  constructor(props){
    super(props)
    this.state = {
      navigator : {
        data: {}
      }
    }

    EventManager.on(NAVIGATOR_CHANGE, (data)=>{
      this.setState({ navigator : data })
    })
  }

  render (){
    const { navigator } = this.state;
    const dataNavigator = navigator.data;
    return (
      <View style={styles.menu}>
        {menu_list.map((item, i)=> {
          const styl = item.to == dataNavigator.routeId ?
            styles.item_active : {}


          return (
            <Link {...item} key={i} style={[styles.item_menu, styl]}>
              <View style={styles.w_icons}>
                <Icon name={`${item.icon}`} style={styles.icons}/>
              </View>
              <Text style={styles.item}>{item.name}</Text>
            </Link>
          )
        })}
      </View>
    )
  }

}

export default Menu;
