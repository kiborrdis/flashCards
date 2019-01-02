import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT_COLOR } from 'shared/styles';
import ListItem from 'shared/components/ListItem';
import Label from 'shared/components/Label';


const DeckListItem = ({ label, numberOfCards = 0, onPress, id }) => (
  <ListItem onPress={() => onPress(id)}>
    <View style={styles.item}>
      <Label>{label}</Label>
      <Label>{numberOfCards}</Label>
    </View>
  </ListItem>
);

const styles  = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default DeckListItem;