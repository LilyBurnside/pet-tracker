import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class Loading extends Component {

  componentDidMount(){
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user =>
    {
      if(user){
        this.props.navigation.navigate('DashboardScreen');
      } else {
        this.props.navigation.navigate('LandingScreen');
      }
    }
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});