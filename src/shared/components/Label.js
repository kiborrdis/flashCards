import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../styles';

const Label = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

const styles  = StyleSheet.create({
  label: {
    fontSize: 15,
    color: TEXT_COLOR,
    fontWeight: '400',
  }
});

export default Label;