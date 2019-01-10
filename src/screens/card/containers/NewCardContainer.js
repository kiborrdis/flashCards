import React from 'react';
import { BackHandler } from 'react-native';
import StorageContext from 'shared/storage/storageContext';
import { createCardInDeck } from 'shared/storage/storageActions';
import NewCard from '../components/NewCard';
import CardContainer from './CardContainer';

class NewCardContainer extends React.Component {
  static contextType = StorageContext;

  handleCardComplete = async (cardValues) => {
    await this.createCard(cardValues);

    if (this.props.closeOnCardCreation) {
      BackHandler.exitApp();

      return;
    }
  }

  shouldCreateNewCard = () => {
    return !this.props.closeOnCardCreation;
  }

  async createCard({ frontside, backside }) {
    const storage = this.context;
    const { deckId } = this.props;

    return storage.performAction(createCardInDeck(deckId, { frontside, backside }));;
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
