import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { TEXT_COLOR, TOPBAR_COLOR, } from '../../styles'

const FRONTSIDE_COLOR = TOPBAR_COLOR; 
const BACKSIDE_COLOR = TEXT_COLOR;

const Card = ({ value, content, faceBackside }) => (
  <View style={[styles.card, faceBackside ? styles.altCard : undefined]}>
    {
      content 
      ? content(value) 
      : (
        <Text style={[styles.text, faceBackside ? styles.altText : undefined]}>
          {value}
        </Text>         
      )
    }
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FRONTSIDE_COLOR,
  },
  altCard: {
    backgroundColor: BACKSIDE_COLOR,
  },
  text: {
    color: BACKSIDE_COLOR,
  },
  altText: {
    color: FRONTSIDE_COLOR,
  },
});

export default Card;