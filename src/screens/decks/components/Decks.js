import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import ToolbarLayout from 'shared/components/ToolbarLayout';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import DeckListItem from './DeckListItem';

const Decks = ({
  onItemPress, loaded, removeDeck, renameDeck, data = [],
}) => (
  <ToolbarLayout>
    <LoadingWrapper loading={!loaded}>
      {() => (
        <FlatList
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
      )}
    </LoadingWrapper>
  </ToolbarLayout>
);

Decks.propTypes = {
  loaded: PropTypes.bool.isRequired,
  onItemPress: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  renameDeck: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    deckId: PropTypes.number.isRequired,
    numberOfCards: PropTypes.number.isRequired,
  })),
};

export default Decks;
