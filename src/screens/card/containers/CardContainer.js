import React from 'react';
import PropTypes from 'prop-types';
import NewCard from '../components/NewCard';

class CardContainer extends React.Component {
  static propTypes = {
    defaultFrontside: PropTypes.string,
    defaultBackside: PropTypes.string,
    shouldCreateNewCard: PropTypes.func,
    onCardComplete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultFrontside: '',
    defaultBackside: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      frontside: props.defaultFrontside,
      backside: props.defaultBackside,
      faceFrontside: true,
      index: 0,
    };

    this.cardRef = React.createRef();
  }

  onRotatePress = () => {
    this.handleRequestRotation();
  }

  onApplyPress = () => {
    this.cardRef.current.handleSwipe('right');
  }

  handleRequestRotation = () => {
    this.setState(({ faceFrontside }) => ({
      faceFrontside: !faceFrontside,
    }));
  }

  handleSuggestionPress = (suggestion) => {
    const { backside } = this.state;

    this.setState({
      backside: backside ? `${backside}, ${suggestion}` : suggestion,
    });
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
    this.setState(({ index }) => ({
      frontside: '',
      backside: '',
      index: index + 1,
      faceFrontside: true,
    }));
  }

  onChange = (newValues) => {
    this.setState({ ...newValues });
  }

  render() {
    const {
      frontside, backside, faceFrontside, index,
    } = this.state;

    return (
      <NewCard
        index={index}
        faceFrontside={faceFrontside}
        frontside={frontside}
        backside={backside}
        cardRef={this.cardRef}
        onSuggestionPress={this.handleSuggestionPress}
        onRotatePress={this.onRotatePress}
        onApplyPress={this.onApplyPress}
        onRequestRotation={this.handleRequestRotation}
        onSwipe={this.onSwipe}
        onChange={this.onChange}
      />
    );
  }
}

export default CardContainer;
