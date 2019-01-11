import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import withStorageData from 'shared/containers/withStorageData';
import {
  getDecks, createDeck, deleteDeck, updateDeck,
} from 'shared/storage/storageActions';
import { makeDeckScreen, makePromptScreen } from 'shared/navigation';
import Decks from '../components/Decks';

class DecksContainer extends React.Component {
  static propTypes = {
    updateData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})),
    loaded: PropTypes.bool,
    storage: PropTypes.shape({
      performAction: PropTypes.func,
    }).isRequired,
    componentId: PropTypes.string.isRequired,
  }

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

    await storage.performAction(createDeck(deckName));

    updateData();
  }

  removeDeck = async (deckId) => {
    const { updateData, storage } = this.props;

    storage.performAction(deleteDeck(deckId));

    updateData();
  }

  openRenameDeckModal = (deckId) => {
    Navigation.showModal(makePromptScreen({
      title: 'Rename deck',
      onApply: name => this.renameDeck(deckId, name),
    }));
  }

  renameDeck = (deckId, name) => {
    const { updateData, storage } = this.props;

    storage.performAction(updateDeck(deckId, { name }));

    updateData();
  }

  handleItemPress = (deckId) => {
    const { componentId } = this.props;

    Navigation.push(componentId, makeDeckScreen(deckId));
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <Decks
        onItemPress={this.handleItemPress}
        removeDeck={this.removeDeck}
        renameDeck={this.openRenameDeckModal}
        loaded={loaded}
        data={data}
      />
    );
  }
}

export default withStorageData(getDecks)(DecksContainer);
