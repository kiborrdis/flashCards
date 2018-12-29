import React from 'react';
import { Navigation } from "react-native-navigation";
import withDatabaseData from 'memoCards/src/shared/containers/withDatabaseData';
import database from 'memoCards/src/shared/database/Database';
import { getDecks, createDeck } from 'memoCards/src/shared/database/queryCreators';
import { makeCardsOfDeckScreen, makePromptScreen } from 'memoCards/src/shared/navigation';
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
    const { updateData } = this.props;

    await database.executeSql(createDeck(deckName)); 

    updateData();
  }

  onItemPress = (id) => {
    Navigation.push(this.props.componentId, makeCardsOfDeckScreen(id));
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

export default withDatabaseData(getDecks)(DecksContainer);
