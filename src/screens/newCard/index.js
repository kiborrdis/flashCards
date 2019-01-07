import React from 'react';
import NewCard from './containers/NewCardContainer';

class NewCardScreen extends React.Component {
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
    return <NewCard {...this.props} />
  }
}

export default NewCardScreen;
