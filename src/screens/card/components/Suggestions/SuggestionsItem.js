import React from 'react';
import PropTypes from 'prop-types';
import Label from 'shared/components/Label';
import { TouchableHighlight } from 'react-native';

const SuggestionItem = ({ label, index, onPress }) => (
  <TouchableHighlight onPress={() => onPress(index)}>
    <Label>{label}</Label>
  </TouchableHighlight>
);

SuggestionItem.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SuggestionItem;
