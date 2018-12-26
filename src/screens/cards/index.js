import React from "react";
import { View, Text } from "react-native";
import CardsContainer from './containers/CardsContainer';

class CardsScreen extends React.Component {
  static navigationOptions = {
    title: 'Cards',
  };

  render() {
    const { navigation } = this.props;

    return <CardsContainer deckId={navigation.state.params.deckId} />
  }
}

export default CardsScreen;
