import React from 'react';
import { Navigation } from 'react-native-navigation';
import PreferencesContext from '../preferences/preferencesContext';

const withPreferences = (Component) => {
  const WithPreferences = props => (
    <PreferencesContext.Consumer>
      {preferences => (
        <Component {...props} preferences={preferences} />
      )}
    </PreferencesContext.Consumer>
  );

  return WithPreferences;
};

export default withPreferences;
