import React from 'react';
import { Navigation } from "react-native-navigation";
import DatabaseContainer from './containers/DatabaseContainer';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import { screens, DECKS, screensConfig } from './screens';
import App from "./App";

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
  Navigation.registerComponent(id, () => wrapWithRootContainers(component));
})

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: screensConfig
  });
});