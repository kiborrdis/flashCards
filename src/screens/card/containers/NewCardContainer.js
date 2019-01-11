import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import StorageContext from 'shared/storage/storageContext';
import { createCardInDeck } from 'shared/storage/storageActions';
import CardContainer from './CardContainer';

class NewCardContainer extends React.Component {
  static propTypes = {
    closeOnCardCreation: PropTypes.bool,
    deckId: PropTypes.number.isRequired,
    defaultFrontside: PropTypes.string,
    defaultBackside: PropTypes.string,
  }

  static contextType = StorageContext;

  handleCardComplete = async (cardValues) => {
    const { closeOnCardCreation } = this.props;

    await this.createCard(cardValues);

    if (closeOnCardCreation) {
      BackHandler.exitApp();
    }
  }

  shouldCreateNewCard = () => {
    const { closeOnCardCreation } = this.props;

    return !closeOnCardCreation;
  }

  async createCard({ frontside, backside }) {
    const storage = this.context;
    const { deckId } = this.props;

    return storage.performAction(createCardInDeck(deckId, { frontside, backside }));
  }

  render() {
    const { defaultFrontside, defaultBackside } = this.props;

    return (
      <CardContainer
        defaultFrontside={defaultFrontside}
        defaultBackside={defaultBackside}
        shouldCreateNewCard={this.shouldCreateNewCard}
        onCardComplete={this.handleCardComplete}
      />
    );
  }
}

export default NewCardContainer;
