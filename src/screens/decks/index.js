import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import DecksContainer from './containers/DecksContainer';

class DecksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Decks',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('NewDeckModal')}
          title="+"
          color="black"
        />
      ),
    };
  };

  render() {
    const { navigation } = this.props;

    return <DecksContainer navigate={navigation.navigate} />
  }
}

export default DecksScreen;
