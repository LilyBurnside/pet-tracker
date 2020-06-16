import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DashboardScreen from './screens/DashboardScreen';
import LandingScreen from './screens/LandingScreen';
import LoadingScreen from './screens/LoadingScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    if(!firebase.apps.length) {
      try{
        firebase.initializeApp(firebaseConfig)
      } catch (err) {
        console.error('Firebase initialization error raised', err.stack)
      }
    }

  }
  
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LandingScreen: LandingScreen,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
