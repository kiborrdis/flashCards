import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../styles';

const Label = ({ children, size = 'default' }) => (
  <Text style={[styles.label, styles[size]]}>{children}</Text>
);

const styles = StyleSheet.create({
  big: {
    fontSize: 24,
  },
  default: {
    fontSize: 15,
  },
  medium: {
    fontSize: 18,
  },
  label: {
    color: TEXT_COLOR,
    fontWeight: '400',
  },
});

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]).isRequired,
  size: PropTypes.oneOf(['default', 'medium', 'big']),
};

export default Label;
