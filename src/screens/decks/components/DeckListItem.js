import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT_COLOR } from 'shared/styles';
import ListItem from 'shared/components/ListItem';
import Label from 'shared/components/Label';

const DeckListItem = ({
  label, numberOfCards = 0, onPress, id, removeDeck, renameDeck,
}) => (
  <ListItem
    onPress={() => onPress(id)}
    actions={[
      { label: 'Rename', onPress: () => renameDeck(id) },
      { label: 'Remove', onPress: () => removeDeck(id) },
    ]}
  >
    <View style={styles.item}>
      <Label>{label}</Label>
      <Label>{numberOfCards}</Label>
    </View>
  </ListItem>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    flex: 1,
  },
  actions: {
    alignSelf: 'center',
  },
});

export default DeckListItem;
