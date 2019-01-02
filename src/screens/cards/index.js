import React from 'react';
import Cards from './containers/CardsContainer';
import DeckStatsContainer from './containers/DeckStatsContainer';

class CardsScreen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Cards',
        },
        rightButtons: [
          {
            id: 'addCardButton',
            text: '+',
            color: 'white',
          },
        ],
      }
    };
  }

  render() {
    return <DeckStatsContainer {...this.props} />
  }
}

export default CardsScreen;
