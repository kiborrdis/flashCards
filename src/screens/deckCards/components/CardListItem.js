import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from 'shared/components/ListItem';
import Label from 'shared/components/Label';

const CardListItem = ({
  frontside, backside, cardId, removeCard, editCard,
}) => (
  <ListItem
    actions={[
      { label: 'Edit', onPress: () => editCard(cardId) },
      { label: 'Remove', onPress: () => removeCard(cardId) },
    ]}
  >
    <Label>{frontside}</Label>
    <Label>{backside}</Label>
  </ListItem>
);

export default CardListItem;
