import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ToolbarLayout from 'shared/components/ToolbarLayout';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import DeckListItem from './DeckListItem';

const Decks = ({ onItemPress, loaded, removeDeck, renameDeck, data = [] }) => {
  return (
    <ToolbarLayout>
      <LoadingWrapper loading={!loaded}>
        {() => {

          return <FlatList
            data={data}
            keyExtractor={({ deckId }) => String(deckId)}
            renderItem={({ item }) => (
              <DeckListItem 
                onPress={onItemPress} 
                id={item.deckId} 
                label={item.name} 
                numberOfCards={item.numberOfCards}
                removeDeck={removeDeck}
                renameDeck={renameDeck}
              />
            )}
          />
        }
        }
      </LoadingWrapper>
    </ToolbarLayout>
  );
} 

export default Decks;