import React from 'react';
import Label from 'shared/components/Label';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

const SuggestionItem = ({ label, index, onPress }) => (
  <TouchableHighlight onPress={() => onPress(index)}>
      <Label>{label}</Label>      
  </TouchableHighlight>
);

export default SuggestionItem;
