import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'shared/components/ListItem';
import Label from 'shared/components/Label';

const CardListItem = ({
  frontside, backside, cardId, removeCard, editCard,
}) => (
  <ListItem
    actions={[
      { label: 'Edit', onPress: () => editCard(cardId) },
      { label: 'Remove', onPress: () => removeCard(cardId) },
    ]}
  >
    <Label>{frontside}</Label>
    <Label>{backside}</Label>
  </ListItem>
);

CardListItem.propTypes = {
  frontside: PropTypes.string,
  backside: PropTypes.string,
  cardId: PropTypes.number.isRequired,
  removeCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
};

export default CardListItem;
