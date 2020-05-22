/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import {GoogleSignin} from '@react-native-community/google-signin';

export default class HomeScreen extends Component {
  _isMounted = false;
  state = {
    email: '',
    displayName: '',
  };
  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user && this._isMounted) {
        const {email, displayName} = user;
        this.setState({email, displayName});
      }
    });
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
        <Text>{this.state.displayName}</Text>
        <Text>{this.state.email}</Text>
        <TouchableOpacity onPress={this.signOut}>
          <Text style={{color: 'red', marginTop: 32}}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
