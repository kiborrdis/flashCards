import React from 'react';
import PropTypes from 'prop-types';
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
  },
});

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
