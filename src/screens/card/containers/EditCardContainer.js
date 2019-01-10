import React from 'react';
import { Navigation } from 'react-native-navigation';
import { updateCardSides, getCard } from 'shared/storage/storageActions';
import withStorageData from 'shared/containers/withStorageData';
import CardContainer from './CardContainer';

class EditCardContainer extends React.Component {
  handleCardComplete = async (cardValues) => {
    await this.updateCard(cardValues);

    this.returnToDeck();
  }

  returnToDeck() {
    const { componentId } = this.props;

    Navigation.pop(componentId);
  }

  shouldCreateNewCard = () => {
    return false;
  }

  async updateCard(cardSides) {
    const { cardId, storage } = this.props;

    return storage.performAction(updateCardSides(cardId, cardSides));;
  }

  render() {
    const { loaded, data } = this.props;

    if (!loaded) {
      return null;
    }
    console.log('???', data);
    return (
      <CardContainer
        defaultFrontside={data.frontside}
        defaultBackside={data.backside}
        shouldCreateNewCard={this.shouldCreateNewCard}
        onCardComplete={this.handleCardComplete}
      />
    );
  }
}

export default withStorageData(
  ({ cardId }) => getCard(cardId)
)(EditCardContainer);
