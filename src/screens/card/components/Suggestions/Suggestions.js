import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import Label from 'shared/components/Label';
import { TOPBAR_COLOR } from 'shared/styles';
import SuggestionsList from './SuggestionsList';

const Suggestions = ({ loaded, suggestions, onPress }) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Label>Suggestions</Label>
    </View>
    {(
      loaded
        ? <SuggestionsList suggestions={suggestions} loaded={loaded} onPress={onPress} />
        : <Label>Loading</Label>
    )}
  </View>
);

const styles = {
  container: {
    backgroundColor: TOPBAR_COLOR,
    padding: 5,
    borderRadius: 4,
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
};

export default Suggestions;
