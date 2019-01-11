import React from 'react';
import DeckCardsContainer from './containers/DeckCardsContainer';

class DeckCardsScreen extends React.Component {
  render() {
    return <DeckCardsContainer {...this.props} />;
  }
}

export default DeckCardsScreen;
