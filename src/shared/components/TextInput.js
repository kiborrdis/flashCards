import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import { TEXT_COLOR, TOPBAR_COLOR } from '../styles';

const TextInput = ({
  alt, value, onChangeText, onEditStop, placeholder,
}) => (
  <NativeTextInput
    placeholder={placeholder}
    style={[styles.input, alt ? styles.altInput : undefined]}
    placeholderTextColor={alt ? TOPBAR_COLOR : TEXT_COLOR}
    value={value}
    onChangeText={onChangeText}
    onSubmitEditing={onEditStop}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    minWidth: 100,
    borderBottomColor: TEXT_COLOR,
    color: TEXT_COLOR,
  },
  altInput: {
    borderBottomColor: TOPBAR_COLOR,
    color: TOPBAR_COLOR,
  },
});

TextInput.propTypes = {
  alt: PropTypes.bool,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onEditStop: PropTypes.func,
};

export default TextInput;
