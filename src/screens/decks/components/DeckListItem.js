import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
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

DeckListItem.propTypes = {
  label: PropTypes.string.isRequired,
  numberOfCards: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  renameDeck: PropTypes.func.isRequired,
};

export default DeckListItem;
