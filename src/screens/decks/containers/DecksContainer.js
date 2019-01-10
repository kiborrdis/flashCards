import React from 'react';
import { Navigation } from "react-native-navigation";
import withStorageData from 'shared/containers/withStorageData';
import { getDecks, createDeck, deleteDeck, updateDeck } from 'shared/storage/storageActions';
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

  removeDeck = async (deckId) => {
    const { updateData, storage } = this.props;

    deleteDeck(storage, deckId);

    updateData();
  }

  openRenameDeckModal = (deckId) => {
    Navigation.showModal(makePromptScreen({ 
      title: 'Rename deck', 
      onApply: (name) => this.renameDeck(deckId, name), 
    }));
  }

  renameDeck = (deckId, name) => {
    const { updateData, storage } = this.props;

    updateDeck(storage, deckId, { name })

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
        removeDeck={this.removeDeck}
        renameDeck={this.openRenameDeckModal}
        loaded={loaded} 
        data={data} />
    );
  }
}

export default withStorageData(getDecks)(DecksContainer);
