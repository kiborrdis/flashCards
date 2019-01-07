import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from 'shared/components/ListItem';
import Label from 'shared/components/Label';

const CardListItem = ({ frontside, backside }) => (
  <ListItem>
    <Label>{frontside}</Label>
    <Label>{backside}</Label>
  </ListItem>
);



export default CardListItem;