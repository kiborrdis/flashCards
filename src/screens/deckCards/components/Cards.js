import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import ToolbarLayout from 'shared/components/ToolbarLayout';
import LoadingWrapper from 'shared/components/LoadingWrapper';
import CardListItem from './CardListItem';

const Cards = ({
  loaded, data, removeCard, editCard,
}) => (
  <ToolbarLayout>
    <LoadingWrapper loading={!loaded}>
      {() => (
        <FlatList
          data={data}
          keyExtractor={({ cardId }) => String(cardId)}
          renderItem={({ item }) => (
            <CardListItem
              cardId={item.cardId}
              frontside={item.frontside}
              backside={item.backside}
              removeCard={removeCard}
              editCard={editCard}
            />
          )}
        />
      )}
    </LoadingWrapper>
  </ToolbarLayout>
);

Cards.propTypes = {
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    cardId: PropTypes.number.isRequired,
    frontside: PropTypes.string,
    backside: PropTypes.string,
  })),
  removeCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
};

export default Cards;
