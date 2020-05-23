import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

import * as firebase from 'firebase';
import PlayScreen from './screens/PlayScreen';
import ProfileScreen from './screens/ProfileScreen';

var firebaseConfig = {
  apiKey: 'AIzaSyB0PR3_Z-1jInWRanOGr5XYkf5BdvbYFag',
  authDomain: 'btl-mobile-app.firebaseapp.com',
  databaseURL: 'https://btl-mobile-app.firebaseio.com',
  projectId: 'btl-mobile-app',
  storageBucket: 'btl-mobile-app.appspot.com',
  messagingSenderId: '136005534027',
  appId: '1:136005534027:web:1ef9cdfd9f46891358a8ce',
  measurementId: 'G-1YXWM0WE9B',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={25} color={tintColor} />
        ),
        headerShown: false,
      },
    },
    Play: {
      screen: PlayScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View style={styles.iconCenter}>
            <Icon name="headphones" size={25} color="#fff" />
          </View>
        ),
        headerShown: false,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" size={26} color={tintColor} />
        ),
        headerShown: false,
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        borderRadius: 5,
        height: 80,
        borderTopColor: '#EEE',
      },
    },
  },
);

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: {
        screen: AppTabNavigator,
      },
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

const styles = new StyleSheet.create({
  iconCenter: {
    backgroundColor: '#E9446A',
    padding: 15,
    borderRadius: 30,
    color: '#FFF',
  },
});
