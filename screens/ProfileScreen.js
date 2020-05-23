/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
import {GoogleSignin} from '@react-native-community/google-signin';

import Icon from 'react-native-vector-icons/Feather';
export default class ProfileScreen extends Component {
  _isMounted = false;
  state = {
    email: '',
    displayName: '',
    photoURL: 'https://reactnative.dev/docs/assets/p_cat2.png',
  };

  alertTest = text => {
    alert(text);
  };

  actionOnOption(item) {
    switch (item.id) {
      case '1':
        break;
      case '2':
        break;
      case '7':
        this.signOut();
        break;

      default:
        break;
    }
  }

  options = [
    {
      id: '1',
      name: 'Nhạc của tôi',
      icon: 'music',
    },
    {
      id: '2',
      name: 'Nhạc yêu thích',
      icon: 'heart',
    },
    {
      id: '3',
      name: 'Kết nối',
      icon: 'message-square',
    },
    {
      id: '4',
      name: 'Tải nhạc Youtube',
      icon: 'youtube',
    },
    {
      id: '5',
      name: 'Cài đặt chung',
      icon: 'sliders',
    },
    {
      id: '6',
      name: 'Trợ giúp',
      icon: 'info',
    },
    {
      id: '7',
      name: 'Đăng xuất',
      icon: 'log-out',
    },
  ];

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const {email, displayName, photoURL} = user;
          this.setState({email, displayName, photoURL});
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  signOut = () => {
    firebase.auth().signOut();
    GoogleSignin.signOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={styles.info}>
          <Image
            style={styles.avatar}
            source={{
              uri: this.state.photoURL,
            }}
          />
          <Text style={styles.name}>{this.state.displayName}</Text>
          <Text style={{color: 'rgba(149, 149, 149, 0.8)'}}>
            {this.state.email}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={this.options}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.actionOnOption(item)}>
              <View style={styles.list_item}>
                <Text style={styles.list_item_text}>{item.name}</Text>
                <Icon name={item.icon} size={16} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  info: {
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#273b30',
  },
  list: {
    padding: 10,
  },
  list_item: {
    backgroundColor: '#FFF',
    padding: 14,
    marginHorizontal: 10,
    marginVertical: 7,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 3,
    borderLeftColor: '#E9446A',
    borderRadius: 1,
  },
  list_item_text: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: 'rgba(0,0,0,0.8)',
  },
});
