import React from 'react';
import { Text, FlatList } from 'react-native';
import ToolbarLayout from 'memoCards/src/shared/components/ToolbarLayout';
import LoadingWrapper from 'memoCards/src/shared/components/LoadingWrapper';
import CardListItem from './CardListItem';

const Cards = ({ loaded, data, addCard }) => (
  <ToolbarLayout
    title="Cards" 
    actions={[{ title: '+', show: 'always' }]}
    onActionSelected={addCard}
  >
    <LoadingWrapper loading={!loaded}>
      {() => (
        <FlatList
          data={data}
          keyExtractor={({ cardId }) => String(cardId)}
          renderItem={({ item }) => (<CardListItem 
            frontside={item.frontside}
            backside={item.backside}
          />)}
        />
      )}
    </LoadingWrapper>
  </ToolbarLayout>
)

export default Cards;
