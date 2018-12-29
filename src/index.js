import React from 'react';
import { Navigation } from "react-native-navigation";
import database from 'memoCards/src/shared/database/Database';
import DatabaseContainer from './containers/DatabaseContainer';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import { screens, DECKS, screensConfig } from './screens';
import App from "./App";
import { AppState } from 'react-native';

const wrapWithRootContainers = (Component) => (props) => (
  <DatabaseContainer>
    {({ loaded }) => (
      <LoadingWrapper loading={!loaded}>
        {() => <Component {...props} />}
      </LoadingWrapper>
    )} 
  </DatabaseContainer>
);

screens.forEach((component, id) => {
  Navigation.registerComponent(id, () => wrapWithRootContainers(component), () => component);
})

let prevAppState = '';

function handleAppStateChange(nextAppState) {
  if (prevAppState.match(/inactive|background/) && nextAppState === 'active') {
    onAppComeForeground();
  }

  if (prevAppState.match(/inactive|active/) && nextAppState === 'background') {
    onAppComeBackground();
  }

  prevAppState = nextAppState;
}

function onAppComeForeground() {
  database.open();;
}

function onAppComeBackground() {
  database.close();
}

Navigation.events().registerAppLaunchedListener(() => {
  onAppComeForeground();

  AppState.addEventListener('change', handleAppStateChange);

  Navigation.setRoot({
    root: screensConfig
  });
});