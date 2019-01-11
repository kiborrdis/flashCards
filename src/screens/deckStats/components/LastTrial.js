import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import Label from 'shared/components/Label';
import withStorageData from 'shared/containers/withStorageData';
import { getLastTrialForDeck } from 'shared/storage/storageActions';

const LastTrial = ({ loaded, data, deckId }) => (
  <LoadingWrapper loading={!loaded}>
    {() => {
      const stats = data;

      if (!stats) {
        return (
          <View style={styles.container}>
            <View style={styles.title}>
              <Label>No trials</Label>
            </View>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Label size="medium">
Last trial #
              {stats.trialId}
            </Label>
            <Label>{new Date(stats.createdAt).toLocaleDateString()}</Label>
          </View>
          <View style={styles.stats}>
            <View style={styles.cell}>
              <Label>Cards</Label>
              <Label size="big">{stats.numberOfCards}</Label>
            </View>
            <View style={styles.cell}>
              <Label>Viewed cards</Label>
              <Label size="big">{stats.numberOfViewedCards}</Label>
            </View>
            <View style={styles.cell}>
              <Label>Matched cards</Label>
              <Label size="big">{stats.numberOfMatchedCards}</Label>
            </View>
          </View>
        </View>
      );
    }}
  </LoadingWrapper>
);

const styles = StyleSheet.create({
  title: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    paddingTop: 20,
  },
  cell: {
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingRight: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default withStorageData(
  ({ deckId }) => getLastTrialForDeck(deckId),
)(LastTrial);
