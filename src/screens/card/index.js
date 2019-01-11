import React from 'react';
import PropTypes from 'prop-types';
import NewCard from './containers/NewCardContainer';
import EditCard from './containers/EditCardContainer';

class CardScreen extends React.Component {
  static propTypes = {
    cardId: PropTypes.number,
    componentId: PropTypes.string.isRequired,
  }

  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    };
  }

  render() {
    const { cardId, componentId } = this.props;

    if (cardId) {
      return <EditCard cardId={cardId} componentId={componentId} />;
    }

    return <NewCard {...this.props} />;
  }
}

export default CardScreen;
