import React from 'react';
import { View, StyleSheet } from 'react-native';
import Toolbar from './Toolbar';

const ToolbarLayout = ({ children, title, actions, onActionSelected }) => (
  <View style={styles.container}>
    <Toolbar
      title={title} 
      actions={actions}
      onActionSelected={onActionSelected}
    />
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  content: {
    flex: 1,
  },
});


export default ToolbarLayout;
