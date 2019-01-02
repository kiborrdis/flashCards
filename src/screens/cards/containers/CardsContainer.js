import React from 'react';
import { Navigation } from "react-native-navigation";
import withDatabaseData from 'memoCards/src/shared/containers/withDatabaseData';
import database from 'memoCards/src/shared/database/Database';
import { getCardsFromDeck, createCardInDeck } from 'memoCards/src/shared/database/queryCreators';
import Cards from '../components/Cards';

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'addCardButton') {
      this.addCard();
    }
  }


  addCard = () => {
    const { deckId, updateData } = this.props;

    database.executeSql(createCardInDeck(deckId, {
      frontside: 'Лицевая',
      backside: 'Backside',
    })).then(updateData);
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

export default withDatabaseData(({ deckId }) => getCardsFromDeck(deckId))(CardsContainer);
