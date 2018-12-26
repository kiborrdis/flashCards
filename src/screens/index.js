import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Decks from './decks';
import Cards from './cards';
import Card from './card';

const AppNavigator = createStackNavigator({
  Decks: Decks, 
  Cards: Cards, 
  Card: Card, 
}, {
  initialRouteName: 'Decks',
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'black',
    },
  },
});

export default createAppContainer(AppNavigator);