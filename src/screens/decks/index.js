import React from "react";
import { View, Text } from "react-native";
import DecksContainer from './containers/DecksContainer';

class DecksScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks',
  };

  render() {
    const { navigation } = this.props;

    return <DecksContainer navigate={navigation.navigate} />
  }
}

export default DecksScreen;
