import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ToolbarLayout from 'shared/components/ToolbarLayout';
import LastTrial from './LastTrial';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import Label from 'shared/components/Label';

// numberOfTrials
// numberOfLearnedCards
const DeckStats = ({ loaded, stats, deckId, startNewTrial }) => (
  <ToolbarLayout>
    <LoadingWrapper loading={!loaded}>
      {() => {
        return (
          <View style={styles.container}>
            <View  style={styles.title}>
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
            <View style={styles.space}/>
            <View style={styles.footer}>
              <LastTrial deckId={deckId} />
            </View>
            <View>
              <Button title="Start new trial" onPress={startNewTrial} />
            </View>
          </View>
        );
      }}
    </LoadingWrapper>
  </ToolbarLayout>
)

const styles  = StyleSheet.create({
  title: {
    alignItems: 'flex-start',
    paddingBottom: 5,
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
  }
});

export default DeckStats;
