import React from 'react';
import { ToolbarAndroid, Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator, ProgressBarAndroid } from 'react-native';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import DatabaseContainer from './containers/DatabaseContainer';
import Decks from './screens/decks';
import Cards from './screens/cards';
import Card from './screens/card';

if (__DEV__) {
    console.log('I am in debug');
}

class App extends React.Component {
  render () {
    return <Text>Hello world</Text>
  }
}

  // <DatabaseContainer>
  //   {({ loaded }) => (
  //     <LoadingWrapper loading={!loaded}>
  //       {() => <Card deckId={1} />}
  //     </LoadingWrapper>
  //   )} 
  // </DatabaseContainer>
export default App;
