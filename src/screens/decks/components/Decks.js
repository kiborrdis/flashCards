import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ToolbarLayout from 'memoCards/src/shared/components/ToolbarLayout';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import DeckListItem from './DeckListItem';
import NewDeckModal from './NewDeckModal';

const Decks = ({ addDeck, loaded, data, openNewDeckModal, closeNewDeckModal, newDeckModalOpened }) => {
  return (
    <ToolbarLayout
      title="Decks" 
      actions={[{ title: '+', show: 'always' }]}
      onActionSelected={openNewDeckModal}
    >
      <LoadingWrapper loading={!loaded}>
        {() => (
          <FlatList
            data={data}
            keyExtractor={({ deckId }) => String(deckId)}
            renderItem={({ item }) => (<DeckListItem label={item.name}/>)}
          />
        )}
      </LoadingWrapper>

      <NewDeckModal visible={newDeckModalOpened} close={closeNewDeckModal} onApplyClick={addDeck} />
    </ToolbarLayout>
  );
} 

export default Decks;