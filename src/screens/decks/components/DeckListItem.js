import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from 'memoCards/src/shared/components/ListItem';

const DeckListItem = ({ id, label, onPress }) => (
  <ListItem onPress={() => onPress(id)}>
    <Text style={styles.label}>{label}</Text>
  </ListItem>
);

const styles  = StyleSheet.create({
  label: {
    fontSize: 15,
    color: '#555',
    fontWeight: '400',
  }
});

export default DeckListItem;