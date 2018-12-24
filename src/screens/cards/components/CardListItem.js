import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from 'memoCards/src/shared/components/ListItem';

const CardListItem = ({ frontside, backside }) => (
  <ListItem>
    <Text>{frontside}</Text>
    <Text>{backside}</Text>
  </ListItem>
);

const styles  = StyleSheet.create({
  label: {
    fontSize: 15,
    color: '#555',
    fontWeight: '400',
  }
});

export default CardListItem;