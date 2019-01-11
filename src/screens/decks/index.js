import React from 'react';
import Decks from './containers/DecksContainer';

class DecksScreen extends React.Component {
  static options() {
    return {
      topBar: {
        title: {
          text: 'Decks',
        },
        rightButtons: [
          {
            id: 'addDeckButton',
            icon: require('shared/icons/plus.png'),
          },
        ],
      },
    };
  }

  render() {
    return <Decks {...this.props} />;
  }
}

export default DecksScreen;
