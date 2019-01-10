import React from 'react';
import { BackHandler } from 'react-native';
import StorageContext from 'shared/storage/storageContext';
import { createCardInDeck } from 'shared/storage/storageActions';
import NewCard from '../components/NewCard';

class CardContainer extends React.Component {
  static contextType = StorageContext;

  static defaultProps = {
    defaultFrontside: '',
    defaultBackside: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      frontside: props.defaultFrontside,
      backside: props.defaultBackside,
      index: 0,
    }

    this.cardRef = React.createRef();
  }

  onRotatePress = () => {
    this.cardRef.current.rotate();
  }

  onApplyPress = () => {
    this.cardRef.current.swipeRight();
  }

  shouldCreateNewCard() {
    const { shouldCreateNewCard } = this.props;

    if (shouldCreateNewCard) {
      return shouldCreateNewCard();
    }

    return true;
  }

  onSwipe = () => {
    const { onCardComplete } = this.props;

    if (onCardComplete) {
      onCardComplete({ ...this.state });
    }

    if (this.shouldCreateNewCard()) {
      this.prepareToCreateNewCard(); 
    }
  }

  prepareToCreateNewCard() {
    this.setState(({index}) => ({
      frontside: '',
      backside: '',
      index: index + 1,
    }))
  }

  onChange = (newValues) => {
    this.setState({ ...newValues });
  }

  render() {
    const { frontside, backside, index } = this.state;

    return (
      <NewCard
        index={index}
        frontside={frontside}
        backside={backside}
        cardRef={this.cardRef}
        onRotatePress={this.onRotatePress}
        onApplyPress={this.onApplyPress}
        onSwipe={this.onSwipe}
        onChange={this.onChange}
      />
    );
  }
}

export default CardContainer;
