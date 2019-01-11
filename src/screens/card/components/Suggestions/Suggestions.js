import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
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
});

Suggestions.propTypes = {
  loaded: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func.isRequired,
};

export default Suggestions;
