import React from 'react';
import CardLayout from 'shared/components/CardLayout';
import AnimatedCard from 'shared/components/AnimatedCard';
import { View, Text, Button, StyleSheet } from 'react-native';
import SuggestionsContainer from '../containers/SuggestionsContainer';

const NewCard = ({ 
  index, 
  frontside, 
  backside, 
  cardRef,
  onSwipe, 
  onChange,
  onRotatePress,
  onApplyPress,
  onSuggestionPress, 
}) => (
  <CardLayout
    controlPanel={
      <React.Fragment>
        <Button title="Rotate" onPress={onRotatePress}/>
        <Button title="Apply" onPress={onApplyPress}/>
      </React.Fragment>
    }
    topPanel={
      <SuggestionsContainer onPress={onSuggestionPress} frontside={frontside} />
    }
  >
    <AnimatedCard 
      ref={cardRef}
      frontside={frontside} 
      backside={backside} 
      onSwipeRight={onSwipe}
      onSwipeLeft={onSwipe}
      onChange={onChange}
      editable
      key={index}
    />
  </CardLayout>
)

export default NewCard;
