import React from 'react';
import { Navigation } from "react-native-navigation";
import withStorageData from 'shared/containers/withStorageData';
import { getDecks, createDeck } from 'shared/storage/storageActions';
import { makeDeckScreen, makePromptScreen } from 'memoCards/src/shared/navigation';
import Decks from '../components/Decks';

class DecksContainer extends React.Component {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'addDeckButton') {
      this.openNewDeckModal();
    }
  }

  openNewDeckModal = () => {
    Navigation.showModal(makePromptScreen({ title: 'New deck', onApply: this.addDeck }));
  }

  addDeck = async (deckName) => {
    const { updateData, storage } = this.props;

    await createDeck(storage, deckName);

    updateData();
  }

  onItemPress = (deckId) => {
    Navigation.push(this.props.componentId, makeDeckScreen(deckId));
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <Decks
        onItemPress={this.onItemPress}
        loaded={loaded} 
        data={data} />
    );
  }
}

export default withStorageData(getDecks)(DecksContainer);
