import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { updateCardSides, getCard } from 'shared/storage/storageActions';
import withStorageData from 'shared/containers/withStorageData';
import CardContainer from './CardContainer';

class EditCardContainer extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired,
    storage: PropTypes.shape({
      performAction: PropTypes.func.isRequired,
    }).isRequired,
    loaded: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      frontside: PropTypes.string,
      backside: PropTypes.string,
    }),
  }

  handleCardComplete = async (cardValues) => {
    await this.updateCard(cardValues);

    this.returnToDeck();
  }

  returnToDeck() {
    const { componentId } = this.props;

    Navigation.pop(componentId);
  }

  shouldCreateNewCard = () => false

  async updateCard(cardSides) {
    const { cardId, storage } = this.props;

    return storage.performAction(updateCardSides(cardId, cardSides));
  }

  render() {
    const { loaded, data } = this.props;

    if (!loaded) {
      return null;
    }

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
  ({ cardId }) => getCard(cardId),
)(EditCardContainer);
