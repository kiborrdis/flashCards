import React from 'react';
import { ToolbarAndroid, StyleSheet } from 'react-native';

const Toolbar = ({ title, actions, onActionSelected }) => (
  <ToolbarAndroid
    style={styles.toolbar}
    logo={require('./assets/logo.png')}
    title={title}
    actions={actions}
    onActionSelected={onActionSelected}
  />
);

const styles = StyleSheet.create({
  toolbar: {
    height: 50,
    backgroundColor: 'yellow',
  },
});

export default Toolbar;
