import React from 'react';
import PropTypes from 'prop-types';
import CardLayout from 'shared/components/CardLayout';
import AnimatedCard from 'shared/components/AnimatedCard';
import { Button } from 'react-native';
import SuggestionsContainer from '../containers/SuggestionsContainer';

const NewCard = ({
  index,
  frontside,
  backside,
  faceFrontside,
  cardRef,
  onRequestRotation,
  onSwipe,
  onChange,
  onRotatePress,
  onApplyPress,
  onSuggestionPress,
}) => (
  <CardLayout
    controlPanel={(
      <React.Fragment>
        <Button title="Rotate" onPress={onRotatePress} />
        <Button title="Apply" onPress={onApplyPress} />
      </React.Fragment>
)}
    topPanel={(
          faceFrontside
            ? null
            : <SuggestionsContainer onPress={onSuggestionPress} frontside={frontside} />)
    }
  >
    <AnimatedCard
      ref={cardRef}
      faceFrontside={faceFrontside}
      frontside={frontside}
      backside={backside}
      onSwipeRight={onSwipe}
      onSwipeLeft={onSwipe}
      onSidesChange={onChange}
      onRequestRotation={onRequestRotation}
      editable
      key={index}
    />
  </CardLayout>
);

NewCard.propTypes = {
  index: PropTypes.number.isRequired,
  frontside: PropTypes.string,
  backside: PropTypes.string,
  faceFrontside: PropTypes.bool,
  cardRef: PropTypes.shape({}),
  onRequestRotation: PropTypes.func.isRequired,
  onSwipe: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRotatePress: PropTypes.func.isRequired,
  onApplyPress: PropTypes.func.isRequired,
  onSuggestionPress: PropTypes.func.isRequired,
};

export default NewCard;
