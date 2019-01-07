import React from 'react';
import CardLayout from 'shared/components/CardLayout';
import AnimatedCard from 'shared/components/AnimatedCard';
import Label from 'shared/components/Label';
import { TouchableHighlight, View, Text, Button, StyleSheet, Image } from 'react-native';

const Trial = ({
  ended, 
  index, 
  frontside = 'a', 
  backside = 'b', 
  cardRef,
  onSwipeRight,
  onSwipeLeft, 
  onRotatePress,
  onMatchCardPress,
  onSkipCardPress, 
}) => {
  if (ended) {
    return (<CardLayout>
      <Label>Trial has ended</Label>
    </CardLayout>)
  }

  return (
    <CardLayout
      topPanel={
        <Text>{index}</Text>
      }
      controlPanel={
        <React.Fragment>
          <Button title="Idont" onPress={onSkipCardPress}/>
          <TouchableHighlight onPress={onRotatePress}>
            <Image source={require('shared/icons/rotate.png')} />
          </TouchableHighlight>
          <Button title="Iknow" onPress={onMatchCardPress}/>
        </React.Fragment>
      }
    >
      <AnimatedCard 
        ref={cardRef}
        frontside={frontside} 
        backside={backside} 
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
        key={index}
      />
    </CardLayout>
  )
}

export default Trial;
