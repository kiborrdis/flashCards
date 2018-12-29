import React from 'react';
import Cards from './containers/CardsContainer';

class CardsScreen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Cards'
        },
      }
    };
  }

  render() {
    return <Cards {...this.props} />
  }
}

export default CardsScreen;
