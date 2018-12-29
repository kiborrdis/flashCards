import React from 'react';
import Decks from './containers/DecksContainer';

class DecksScreen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Decks'
        },
        rightButtons: [
          {
            id: 'addDeckButton',
            text: '+',
            color: 'white',
          }
        ]
      }
    };
  }

  render() {
    return <Decks {...this.props} />
  }
}

export default DecksScreen;
