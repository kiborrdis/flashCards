import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';

class CardsSlider extends React.Component {
  static defaultProps = {
    cards: [
      { frontside: 'frontside0', backside: 'backside0', id: 'id0' },
      { frontside: 'frontside1', backside: 'backside1', id: 'id1' },
      { frontside: 'frontside2', backside: 'backside2', id: 'id2' },
      { frontside: 'frontside3', backside: 'backside3', id: 'id3' },
      { frontside: 'frontside4', backside: 'backside4', id: 'id4' },
      { frontside: 'frontside5', backside: 'backside5', id: 'id5' },
      { frontside: 'frontside6', backside: 'backside6', id: 'id6' },
      { frontside: 'frontside7', backside: 'backside7', id: 'id7' },
      { frontside: 'frontside8', backside: 'backside8', id: 'id8' },
      { frontside: 'frontside9', backside: 'backside9', id: 'id9' },
      { frontside: 'frontside10', backside: 'backside10', id: 'id10' },
      { frontside: 'frontside11', backside: 'backside11', id: 'id11' },
      { frontside: 'frontside12', backside: 'backside12', id: 'id12' },
      { frontside: 'frontside13', backside: 'backside13', id: 'id13' },
      { frontside: 'frontside14', backside: 'backside14', id: 'id14' },
    ],
  }

  state = {
    currentCardIndex: 0,
  }

  onSwipeLeft = () => {
    this.setState({ currentCardIndex: this.state.currentCardIndex + 1 });
  }

  onSwipeRight = () => {
    this.setState({ currentCardIndex: this.state.currentCardIndex + 1 });
  }

  renderCurrentCard() {
    const currentCard = this.props.cards[this.state.currentCardIndex];

    if (!currentCard) {
      return null;
    }

    const { frontside, backside, id } = currentCard;
    console.log('?????????', frontside, backside);
    return <Card frontside={frontside} backside={backside} key={id} onSwipeLeft={this.onSwipeLeft} onSwipeRight={this.onSwipeRight} />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentCard()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
  },
})

export default CardsSlider;
