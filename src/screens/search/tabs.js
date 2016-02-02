import React, {
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
  Component
} from 'react-native';
import {connect} from 'react-redux/native';
import styles from './style';

const items = []

const Tabs = (props) => {
  const {activeTab, onTabClick, tabs} = props;

  return (
    <View style={styles.tabs}>
      {tabs.map((item, i)=> {
        return (
          <Item {...item}
            key={i}
            activeTab={activeTab}
            onTabClick={onTabClick}/>
        )
      })}
    </View>
  );
}

const Item = (props) => {
  const {onTabClick, content_type, activeTab, title, urls} = props;
  const contentType = (content_type == 'article') ? 'articles' : content_type;
  const isActive    = (activeTab == contentType);
  const newTitle    = (title == 'Все результаты') ? 'Все' : title;
  const url         = {url: urls.search, contentType};


  return (
    <TouchableOpacity style={styles.tabContent} onPress={(evt) => onTabClick(url)}>
      <Text style={[styles.tabText, {color: isActive ? 'blue' : '#000'}]}>{newTitle}</Text>
      <Text style={styles.tabTextCount}>{props.count}</Text>
    </TouchableOpacity>
  );
}


export default Tabs;
