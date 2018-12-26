import React from 'react';
import database from 'memoCards/src/shared/database/Database';
import { createDeck } from 'memoCards/src/shared/database/queryCreators';
import NewDeck from '../components/NewDeck';

class NewDeckContainer extends React.Component {
  addDeck = async (deckName) => {
    const { updateData, navigation } = this.props;

    await database.executeSql(createDeck(deckName)); 
  }

  close = () => {
    console.log('close')
    const { navigation } = this.props;

    navigation.pop();
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <NewDeck
        onApply={this.addDeck}
        close={this.close} />
    );
  }
}

export default NewDeckContainer;
