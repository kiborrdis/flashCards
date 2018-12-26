import React, {Component} from 'react';
import { ToolbarAndroid, Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator, ProgressBarAndroid } from 'react-native';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import DatabaseContainer from './containers/DatabaseContainer';
import Decks from './screens/decks';
import Cards from './screens/cards';
import Card from './screens/card';
import ScreensNavigation from './screens';

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
