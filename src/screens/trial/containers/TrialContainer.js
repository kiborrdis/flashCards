import React from 'react';
import PropTypes from 'prop-types';
import withStorageData from 'shared/containers/withStorageData';
import { getTrialWithCards, updateCardViewAndMatch, updateTrialViewAndMatch } from 'shared/storage/storageActions';
import Trial from '../components/Trial';

class TrialContainer extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      cards: PropTypes.arrayOf(PropTypes.shape({
        cardId: PropTypes.number.isRequired,
      })),
    }),
    storage: PropTypes.shape({
      performAction: PropTypes.func,
    }).isRequired,
    trialId: PropTypes.number.isRequired,
    loaded: PropTypes.bool.isRequired,
  }

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
    this.cardRef.current.handleSwipe('right');
  }

  onSkipCardPress = () => {
    this.cardRef.current.handleSwipe('left');
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
    const { data } = this.props;
    const { index } = this.state;

    if (data.cards.length - 1 > index) {
      this.setState(({ index: prevIndex }) => ({ index: prevIndex + 1 }));
    } else {
      this.setState({ ended: true });
    }
  }

  componentWillUnmount() {
    const { storage, trialId } = this.props;
    const { index } = this.state;

    updateTrialViewAndMatch(storage, trialId, index + 1, this.numberOfMatches);
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
        onSwipeLeft={this.onSwipeLeft}
        onChange={this.onChange}
      />
    );
  }
}

export default withStorageData(
  ({ trialId }) => getTrialWithCards(trialId),
)(TrialContainer);
