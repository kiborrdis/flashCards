import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ToolbarLayout from 'memoCards/src/shared/components/ToolbarLayout';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import DeckListItem from './DeckListItem';

const Decks = ({ onItemPress, loaded, data = [] }) => {
  return (
    <ToolbarLayout>
      <LoadingWrapper loading={!loaded}>
        {() => {

          return <FlatList
            data={data}
            keyExtractor={({ deckId }) => String(deckId)}
            renderItem={({ item }) => (<DeckListItem onPress={onItemPress} id={item.deckId} label={item.name} numberOfCards={item.numberOfCards}/>)}
          />
        }
        }
      </LoadingWrapper>
    </ToolbarLayout>
  );
} 

export default Decks;