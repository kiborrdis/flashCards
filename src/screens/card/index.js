import React from 'react';
import NewCard from './containers/NewCardContainer';
import EditCard from './containers/EditCardContainer';

class CardScreen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      }
    };
  }

  render() {
    const { cardId, componentId } = this.props;

    if (cardId) {
      return <EditCard cardId={cardId} componentId={componentId} />
    }

    return <Card {...this.props} />
  }
}

export default CardScreen;
