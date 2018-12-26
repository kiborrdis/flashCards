import React, {Component} from 'react';
import { ToolbarAndroid, Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator, ProgressBarAndroid } from 'react-native';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import DatabaseContainer from './containers/DatabaseContainer';
import { createStackNavigator, createAppContainer } from "react-navigation";
import ModalStack from './modals';
import MainStack from './screens';

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    NewDeckModal: {
      screen: ModalStack,
    },
  },
  {
    transparentCard: true,
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      opacity: 1, // Without this card is not transparent after animation
    },
  }
);

const ScreensNavigation = createAppContainer(RootStack);

if (__DEV__) {
    console.log('I am in debug');
}

const App = () => (
  <DatabaseContainer>
    {({ loaded }) => (
      <LoadingWrapper loading={!loaded}>
        {() => <ScreensNavigation/>}
      </LoadingWrapper>
    )} 
  </DatabaseContainer>
);

export default App;
