import React from 'react';
import { Text, FlatList } from 'react-native';
import ToolbarLayout from 'memoCards/src/shared/components/ToolbarLayout';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import CardListItem from './CardListItem';

const Cards = ({ loaded, data, removeCard, editCard }) => (
  <ToolbarLayout>
    <LoadingWrapper loading={!loaded}>
      {() => (
        <FlatList
          data={data}
          keyExtractor={({ cardId }) => String(cardId)}
          renderItem={({ item }) => (<CardListItem
            cardId={item.cardId}
            frontside={item.frontside}
            backside={item.backside}
            removeCard={removeCard}
            editCard={editCard}
          />)}
        />
      )}
    </LoadingWrapper>
  </ToolbarLayout>
)

export default Cards;
