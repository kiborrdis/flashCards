import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../styles';
import Toolbar from './Toolbar';

const ToolbarLayout = ({ children, title, actions, onActionSelected }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  content: {
    flex: 1,
  },
});


export default ToolbarLayout;
