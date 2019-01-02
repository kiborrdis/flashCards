import React from 'react';
import { View } from 'react-native';
import ToolbarLayout from 'shared/components/ToolbarLayout';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import Label from 'shared/components/Label';
import CardListItem from './CardListItem';
// numberOfTrials
// numberOfLearnedCards
const DeckStats = ({ loaded, data, addCard }) => (
  <ToolbarLayout>
    <LoadingWrapper loading={!loaded}>
      {() => {
        const stats = data[0];

        return (
          <View>
            <View>
              <Label>Name</Label>
              <Label>{stats.name}</Label>
            </View>
            <View>
              <Label>Number of cards</Label>
              <Label>{stats.numberOfCards}</Label>
            </View>
            <View>
              <Label>Number of trials</Label>
              <Label>{stats.numberOfTrials}</Label>
            </View>
            <View>
              <Label>Number of learned cards</Label>
              <Label>{stats.numberOfLearnedCards}</Label>
            </View>
          </View>
        );
      }}
    </LoadingWrapper>
  </ToolbarLayout>
)

export default DeckStats;
