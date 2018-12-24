import React from 'react';
import withDatabaseData from 'memoCards/src/shared/containers/withDatabaseData';
import database from 'memoCards/src/shared/database/Database';
import { getDecks, createDeck } from 'memoCards/src/shared/database/queryCreators';
import Decks from '../components/Decks';

class DecksContainer extends React.Component {
  state = {
    newDeckModalOpened: false,
  }

  openNewDeckModal = () => {
    this.setState({ newDeckModalOpened: true });
  }

  closeNewDeckModal = () => {
    this.setState({ newDeckModalOpened: false });
  }

  addDeck = async (deckName) => {
    const { updateData } = this.props;

    await database.executeSql(createDeck(deckName)); 

    updateData();
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <Decks
        openNewDeckModal={this.openNewDeckModal}
        closeNewDeckModal={this.closeNewDeckModal}
        newDeckModalOpened={this.state.newDeckModalOpened}
        addDeck={this.addDeck} 
        loaded={loaded} 
        data={data} />
    );
  }
}

export default withDatabaseData(getDecks)(DecksContainer);
