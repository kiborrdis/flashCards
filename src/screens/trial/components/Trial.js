import React from 'react';
import PropTypes from 'prop-types';
import CardLayout from 'shared/components/CardLayout';
import AnimatedCard from 'shared/components/AnimatedCard';
import Label from 'shared/components/Label';
import {
  TouchableHighlight, Text, Button, Image,
} from 'react-native';

const Trial = ({
  ended,
  index,
  frontside,
  backside,
  cardRef,
  onSwipeRight,
  onSwipeLeft,
  onRotatePress,
  onMatchCardPress,
  onSkipCardPress,
}) => {
  if (ended) {
    return (
      <CardLayout>
        <Label>Trial has ended</Label>
      </CardLayout>
    );
  }

  return (
    <CardLayout
      topPanel={
        <Text>{index}</Text>
      }
      controlPanel={(
        <React.Fragment>
          <Button title="Idont" onPress={onSkipCardPress} />
          <TouchableHighlight onPress={onRotatePress}>
            <Image source={require('shared/icons/rotate.png')} />
          </TouchableHighlight>
          <Button title="Iknow" onPress={onMatchCardPress} />
        </React.Fragment>
      )}
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
  );
};

Trial.propTypes = {
  ended: PropTypes.bool,
  index: PropTypes.number.isRequired,
  frontside: PropTypes.string.isRequired,
  backside: PropTypes.string.isRequired,
  cardRef: PropTypes.shape({}),
  onSwipeRight: PropTypes.func.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onRotatePress: PropTypes.func.isRequired,
  onMatchCardPress: PropTypes.func.isRequired,
  onSkipCardPress: PropTypes.func.isRequired,
};

export default Trial;
