import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TOPBAR_COLOR } from '../styles';

const Menu = ({ children }) => (
  <View style={styles.menu}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  menu: {
    backgroundColor: TOPBAR_COLOR,
  }
})

export default Menu;