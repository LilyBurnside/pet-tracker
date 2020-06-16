import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

class Landing extends Component {

  // signInWithGoogleAsync = async() => {
  //   try {
  //     const result = await Google.logInAsync({
  //       behavior: 'web',
  //       androidClientId: '58603242083-2cdm006ia03u9gpljdm4q5hjvubc3c4m.apps.googleusercontent.com',
  //       scopes: ['profile', 'email'],
  //     });
  
  //     if (result.type === 'success') {
  //       return result.accessToken;
  //     } else {
  //       return { cancelled: true };
  //     }
  //   } catch (e) {
  //     return { error: true };
  //   }
  // }

  state = { user: null };

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: '58603242083-2cdm006ia03u9gpljdm4q5hjvubc3c4m.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <Button 
          title="Sign in with Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});