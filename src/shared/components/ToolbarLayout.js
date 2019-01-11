import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../styles';

const ToolbarLayout = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

ToolbarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

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
