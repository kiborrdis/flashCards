import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Button, TouchableHighlight,
} from 'react-native';
import ToolbarLayout from 'shared/components/ToolbarLayout';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import Label from 'shared/components/Label';
import LastTrial from './LastTrial';

// numberOfTrials
// numberOfLearnedCards
const DeckStats = ({
  loaded, stats, deckId, startNewTrial, sharedDeck, registerAsShareDeck,
}) => (
  <ToolbarLayout>
    <LoadingWrapper loading={!loaded}>
      {() => (
        <View style={styles.container}>
          <View style={styles.title}>
            <Label size="medium">
                Deck stats
            </Label>
          </View>
          <View style={styles.section}>
            <View style={styles.cell}>
              <Label>Cards</Label>
              <Label size="big">{stats.numberOfCards}</Label>
            </View>
            <View style={styles.cell}>
              <Label>% learned</Label>
              <Label size="big">{stats.numberOfLearnedCards}</Label>
            </View>
            <View style={styles.cell}>
              <Label>Trials</Label>
              <Label size="big">{stats.numberOfTrials}</Label>
            </View>
          </View>
          <View style={styles.sharedContainer}>
            <TouchableHighlight onPress={registerAsShareDeck}>
              <View style={[styles.sharedButton, ...(sharedDeck ? [styles.isShared] : [])]}>
                <Label>
                  { sharedDeck ? 'Shared deck' : 'Make this deck shared' }
                </Label>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.space} />
          <View style={styles.footer}>
            <LastTrial deckId={deckId} />
          </View>
          <View>
            <Button title="Start new trial" onPress={startNewTrial} />
          </View>
        </View>
      )}
    </LoadingWrapper>
  </ToolbarLayout>
);

const styles = StyleSheet.create({
  title: {
    alignItems: 'flex-start',
    paddingBottom: 5,
  },
  sharedContainer: {
    height: 30,
  },
  sharedButton: {
    backgroundColor: 'red',
  },
  isShared: {
    backgroundColor: 'green',
  },
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
  },
  space: {
    flex: 1,
  },
  footer: {
  },
  cell: {
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

DeckStats.propTypes = {
  loaded: PropTypes.bool.isRequired,
  sharedDeck: PropTypes.bool.isRequired,
  deckId: PropTypes.number,
  stats: PropTypes.shape({
    numberOfCards: PropTypes.number,
    numberOfLearnedCards: PropTypes.number,
    numberOfTrials: PropTypes.number,
  }),
  startNewTrial: PropTypes.func.isRequired,
  registerAsShareDeck: PropTypes.func.isRequired,
};

export default DeckStats;
