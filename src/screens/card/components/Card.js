import React from 'react';
import { View, Text, Easing, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

const FRONTSIDE_COLOR = 'rgba(0, 0, 0, 1)'; //  mapped to 0 
const BACKSIDE_COLOR = 'rgba(255, 255, 255, 1)'; // mapped to 1
const SWIPE_CALLBACK_THRESHOLD = 100;

const bindAnimationToPromiseAndStart = (animation) => {
  const promise = new Promise((resolve) => {
    animation.start(resolve);
  });

  return promise;
}

class Card extends React.Component {
  state = {
    fade: new Animated.Value(0),  // Initial value for opacity: 0
    scale: new Animated.Value(0.2),
    color: new Animated.Value(0),
    rotation: new Animated.Value(0), // degrees,
    offsetX: new Animated.Value(0),
    inSwap: false,
    faceFrontside: true,
  }

  _currentResponderAction = null

  componentDidMount() {
    Animated.timing(                
      this.state.fade,            
      {
        toValue: 1,                   
        duration: 300,              
      }
    ).start();                        

    Animated.timing(
      this.state.scale,            
      {
        toValue: 1,                   
        duration: 300,              
      }
    ).start();


    // Animated.timing(
    //   this.state.rotation,            
    //   {
    //     toValue: 360,                   
    //     duration: 1500,              
    //   }
    // ).start();
  }

  runRotateAnimation = async () => {
    const { faceFrontside } = this.state; 

    this.setState({ inSwap: true });

    await bindAnimationToPromiseAndStart(Animated.sequence([
      Animated.timing(
        this.state.rotation,            
        {
          toValue: 90,                   
          duration: 250,              
        }
      ),
      Animated.timing(
        this.state.color,            
        {
          toValue: faceFrontside ? 1 : 0,                   
          duration: 0,              
        }
      ),
    ]));

    this.setState({ faceFrontside: !faceFrontside });

    await bindAnimationToPromiseAndStart(Animated.sequence([
      Animated.timing(
        this.state.rotation,            
        {
          toValue: 270,                   
          duration: 0,              
        }
      ),
      Animated.timing(
        this.state.rotation,            
        {
          toValue: 360,                   
          duration: 250,              
        }
      ),
      Animated.timing(
        this.state.rotation,            
        {
          toValue: 0,                   
          duration: 0,              
        }
      ),
    ]));

    this.setState({ inSwap: false });
  }

  handleStartShouldSetResponder = () => {
    console.log('onStartShouldSetResponder');

    return true;
  }

  handleMoveShouldSetResponder = () => {
    console.log('onMovehouldSetResponder');

    return true;
  }

  handleResponderReject = (e) => {
    console.log('onResponderReject', e);

  }

  handleResponderGrant = (e) => {
    this._currentResponderAction = { type: 'tap', initialXLocation: e.nativeEvent.pageX };

    // console.log('onResponderGrant', e.nativeEvent.locationX);
  }

  handleResponderMove = (e) => {
    if (this._currentResponderAction.type === 'tap') {
      this._currentResponderAction.type = 'swipe';
    }

    const swipeDelta = e.nativeEvent.pageX - this._currentResponderAction.initialXLocation;

    Animated.timing(
      this.state.offsetX,            
      {
        easing: Easing.linear,
        toValue: swipeDelta,                   
        duration: 50,              
      }
    ).start();

    Animated.timing(
      this.state.scale,            
      {
        easing: Easing.linear,
        toValue: Math.abs(swipeDelta) > SWIPE_CALLBACK_THRESHOLD ? 0.9 : 1,                   
        duration: 150,              
      }
    ).start();

    // console.log('onResponderMove', e.nativeEvent.locationX);
  }

  handleResponderRelease = (e) => {
    console.log('onResponderRelease');

    if (this._currentResponderAction.type === 'tap') {
      this.onCardTap();
    }

    if (this._currentResponderAction.type === 'swipe') {
      const swipeDelta = e.nativeEvent.pageX - this._currentResponderAction.initialXLocation;

      if (Math.abs(swipeDelta) > SWIPE_CALLBACK_THRESHOLD) {
        if (swipeDelta > 0) {
          this.onSwipeRight();
        } else {
          this.onSwipeLeft();
        }
      } else {
        Animated.timing(
          this.state.offsetX,            
          {
            toValue: 0,                   
            duration: 250,              
          }
        ).start();

        Animated.timing(
          this.state.scale,            
          {
            toValue: 1,                   
            duration: 300,              
          }
        ).start();
      }

    }

    this._currentResponderAction = null;
  }

  onCardTap = () => {
    if (this.state.inSwap) {
      return;
    }

    const { faceFrontside } = this.state; 

    this.runRotateAnimation();
  }

  onSwipeLeft = () => {
    const { onSwipeLeft } = this.props;

    if (onSwipeLeft) {
      Animated.timing(
        this.state.offsetX,            
        {
          toValue: -600,                   
          duration: 250,              
        }
      ).start(onSwipeLeft);
    }
  }

  onSwipeRight = () => {
    const { onSwipeRight } = this.props;

    if (onSwipeRight) {
      Animated.timing(
        this.state.offsetX,            
        {
          toValue: 600,                   
          duration: 250,              
        }
      ).start(onSwipeRight);
    }
  }

  render() {
    const { frontside = 'Frontside', backside = 'Backside' } = this.props;
    const { fade, scale, color, offsetX, rotation, faceFrontside } = this.state;

    return (
      <View
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        onMoveShouldSetResponder={this.handleMoveShouldSetResponder}
        onResponderGrant={this.handleResponderGrant}
        onResponderMove={this.handleResponderMove}
        onResponderRelease={this.handleResponderRelease}
        onResponderReject={this.handleResponderReject}
      >
        <Animated.View 
          
          style={[styles.card, { 
            opacity: fade, 
            transform: [
              { scaleX: scale }, 
              { scaleY: scale },
              { rotateY: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                }) 
              },
              { translateX: offsetX },
            ],
            backgroundColor: color.interpolate({
              inputRange: [0, 1],
              outputRange: [FRONTSIDE_COLOR, BACKSIDE_COLOR]
            }), 
          }]}
        >
          <Animated.Text style={[styles.cardText, {
            color: color.interpolate({
              inputRange: [0, 1],
              outputRange: [BACKSIDE_COLOR, FRONTSIDE_COLOR],
            }), 
          }]}>
            {faceFrontside ? frontside : backside}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  card: {
    height: 200,
    width: 200,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
  },
});

export default Card;