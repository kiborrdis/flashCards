import React from 'react';
import { Linking } from 'react-native';
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
            icon: require('shared/icons/plus.png'),
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
