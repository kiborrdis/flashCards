import React from 'react';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import { PreferencesContext } from 'shared/preferences';
import StorageContainer from './StorageContainer';

const withRootContainers = (Component, { preferences, storage }) => (props) => (
  <PreferencesContext.Provider value={preferences}>
    <StorageContainer storage={storage}>
      {({ loaded }) => (
        <LoadingWrapper loading={!loaded}>
          {() => <Component {...props} />}
        </LoadingWrapper>
      )} 
    </StorageContainer>
  </PreferencesContext.Provider>
);

export default withRootContainers;
