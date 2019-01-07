import React from 'react';
import { Navigation } from "react-native-navigation";
import withStorageData from 'shared/containers/withStorageData';
import { getCardsFromDeck } from 'shared/storage/storageActions';
import { makeNewCardScreen, makeTrialScreen } from 'shared/navigation';
import Cards from '../components/Cards';

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.navigationSubscription = Navigation.events().registerNavigationButtonPressedListener(this.navigationButtonPressed);
  }

  componentWillUnmount() {
    this.navigationSubscription.remove();
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'addCardButton') {
      this.addCard();
    }
  }

  addCard = () => {
    const { deckId, componentId, parentComponentId, updateData } = this.props;

    Navigation.push(parentComponentId || componentId, makeNewCardScreen(deckId));
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <Cards
        loaded={loaded} 
        data={data} 
        addCard={this.addCard}
      />
    );
  }
}

export default withStorageData(
  (storage, { deckId }) => getCardsFromDeck(storage, deckId)
)(CardsContainer);
