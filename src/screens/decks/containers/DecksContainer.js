import React from 'react';
import withDatabaseData from 'memoCards/src/shared/containers/withDatabaseData';
import database from 'memoCards/src/shared/database/Database';
import { getDecks, createDeck } from 'memoCards/src/shared/database/queryCreators';
import { Navigation } from "react-native-navigation";
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

  onItemPress = (id) => {
    Navigation.push(this.props.componentId, {
      component: { 
        name: 'memoCards.cards',
        passProps: {
          deckId: id,
        },
        options: {
          topBar: {
            title: {
              text: 'Cards',
            },
          },
        },
      },
    });
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <Decks
        openNewDeckModal={this.openNewDeckModal}
        closeNewDeckModal={this.closeNewDeckModal}
        newDeckModalOpened={this.state.newDeckModalOpened}
        onItemPress={this.onItemPress}
        addDeck={this.addDeck} 
        loaded={loaded} 
        data={data} />
    );
  }
}

export default withDatabaseData(getDecks)(DecksContainer);
