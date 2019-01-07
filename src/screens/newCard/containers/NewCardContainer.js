import React from 'react';
import { BackHandler } from 'react-native';
import StorageContext from 'shared/storage/storageContext';
import { createCardInDeck } from 'shared/storage/storageActions';
import NewCard from '../components/NewCard';

class NewCardContainer extends React.Component {
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

  onSwipe = () => {
    const { closeOnCardCreation } = this.props;

    this.createCard();

    if (closeOnCardCreation) {
      BackHandler.exitApp();

      return;
    }

    this.prepareToCreateNewCard();
  }

  async createCard() {
    const storage = this.context;
    const { frontside, backside } = this.state;
    const { deckId } = this.props;

    return createCardInDeck(storage, deckId, { frontside, backside });
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

export default NewCardContainer;
