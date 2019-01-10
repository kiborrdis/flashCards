import React from 'react';
import withStorageData from 'shared/containers/withStorageData';
import { getTrialWithCards, updateCardViewAndMatch, updateTrialViewAndMatch } from 'shared/storage/storageActions';
import Trial from '../components/Trial';

class TrialContainer extends React.Component {
  state = {
    index: 0,
    ended: false,
  }

  numberOfMatches = 0

  constructor(props) {
    super(props);

    this.cardRef = React.createRef();
  }

  onRotatePress = () => {
    this.cardRef.current.rotate();
  }

  onMatchCardPress = () => {
    this.cardRef.current.swipeRight();
  }

  onSkipCardPress = () => {
    this.cardRef.current.swipeLeft(); 
  }

  onSwipeRight = () => {
    this.numberOfMatches += 1;
    this.updateCard(true);
    this.toNextCard();

    return true;
  }

  onSwipeLeft = () => {
    this.updateCard();
    this.toNextCard();

    return true;
  }

  updateCard(matched) {
    const { data: { cards }, storage } = this.props;
    const { index } = this.state;

    updateCardViewAndMatch(storage, cards[index].cardId, matched);
  }

  toNextCard = () => {
    if (this.props.data.cards.length - 1 > this.state.index) {
      this.setState(({ index }) => ({ index: index + 1 }));
    } else {
      this.setState({ ended: true });
    }
  }

  componentWillUnmount() {
    const { storage, trialId } = this.props;

    updateTrialViewAndMatch(storage, trialId, this.state.index + 1, this.numberOfMatches);
  }

  render() {
    const { data, loaded } = this.props;
    const { index, ended } = this.state;

    if (!loaded) {
      return null;
    }

    return (
      <Trial
        index={index}
        ended={ended}
        cardRef={this.cardRef}
        frontside={data.cards[index].frontside}
        backside={data.cards[index].backside}
        onRotatePress={this.onRotatePress}
        onMatchCardPress={this.onMatchCardPress}
        onSkipCardPress={this.onSkipCardPress}
        onSwipeRight={this.onSwipeRight}
        onSwipeLeft = {this.onSwipeLeft}
        onChange={this.onChange}
      />
    );
  }
}

export default withStorageData(
  (storage, { trialId }) => getTrialWithCards(storage, trialId)
)(TrialContainer);
