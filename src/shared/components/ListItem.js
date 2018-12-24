import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 50,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
});

export default ListItem;
