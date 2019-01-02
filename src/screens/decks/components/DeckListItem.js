import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT_COLOR } from 'shared/styles';
import ListItem from 'shared/components/ListItem';
import Label from 'shared/components/Label';


const DeckListItem = ({ label, onPress, id }) => (
  <ListItem onPress={() => onPress(id)}>
    <Label>{label}</Label>
  </ListItem>
);

const styles  = StyleSheet.create({
  label: {
    fontSize: 15,
    color: TEXT_COLOR,
    fontWeight: '400',
  }
});

export default DeckListItem;