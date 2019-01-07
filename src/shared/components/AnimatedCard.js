import React from 'react';
import { TextInput, View, Text, Easing, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

const FRONTSIDE_COLOR = 'rgba(0, 0, 0, 1)'; //  mapped to 0 
const BACKSIDE_COLOR = 'rgba(255, 255, 255, 1)'; // mapped to 1
const SWIPE_CALLBACK_THRESHOLD = 100;

const bindAnimationToPromiseAndStart = (animation) => {
  const promise = new Promise((resolve) => {
    animation.start(resolve);
  });

  return promise;
}

const isTrue = () => true;

class AnimatedCard extends React.Component {
  state = {
    fade: new Animated.Value(0),  // Initial value for opacity: 0
    scale: new Animated.Value(0.2),
    color: new Animated.Value(0),
    rotation: new Animated.Value(0), // degrees,
    offsetX: new Animated.Value(0),
    inSwap: false,
    faceFrontside: true,
  }

  constructor(props) {
    super(props);

    this.state.faceFrontside = props.defaultFacing !== 'backside';
  }

  _currentResponderAction = null;

  componentDidMount() {
    this.runFadeInAnimation();
  }

  rotate() {
    return this.runRotateAnimation();
  }

  swipeRight() {
    return this.onSwipeRight();
  }

  swipeLeft() {
    return this.onSwipeLeft();
  }

  runFadeInAnimation() {
    return Promise.all([
      bindAnimationToPromiseAndStart(
        Animated.timing(                
          this.state.fade,            
          {
            toValue: 1,                   
            duration: 300,              
          }
        )
      ),
      bindAnimationToPromiseAndStart(
        Animated.timing(
          this.state.scale,            
          {
            toValue: 1,                   
            duration: 300,              
          }
        )
      ),
    ]);
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

  runSwipeResponseAnimation(swipeDelta) {
    return Promise.all([
      bindAnimationToPromiseAndStart(
        Animated.timing(
          this.state.offsetX,            
          {
            easing: Easing.linear,
            toValue: swipeDelta,                   
            duration: 50,              
          }
        )
      ),
      bindAnimationToPromiseAndStart(
        Animated.timing(
          this.state.scale,            
          {
            easing: Easing.linear,
            toValue: Math.abs(swipeDelta) > SWIPE_CALLBACK_THRESHOLD ? 0.9 : 1,                   
            duration: 150,              
          }
        )
      ),
    ]);
  }

  runMoveToDefaultPositionAnimation() {
    return Promise.all([
      bindAnimationToPromiseAndStart(
        Animated.timing(
          this.state.offsetX,            
          {
            toValue: 0,                   
            duration: 250,              
          }
        )
      ),
      bindAnimationToPromiseAndStart(
        Animated.timing(
          this.state.scale,            
          {
            toValue: 1,                   
            duration: 300,              
          }
        )
      ),
    ]);
  }

  runSwipeAwayAnimation(left) {
    return bindAnimationToPromiseAndStart(
      Animated.timing(
        this.state.offsetX,            
        {
          toValue: (left ? -600 : 600),                   
          duration: 250,              
        }
      )
    );
  }

  handleResponderGrant = (e) => {
    this._currentResponderAction = { type: 'tap', initialXLocation: e.nativeEvent.pageX };
  }

  handleResponderMove = (e) => {
    if (this._currentResponderAction.type === 'tap') {
      this._currentResponderAction.type = 'swipe';
    }

    const swipeDelta = e.nativeEvent.pageX - this._currentResponderAction.initialXLocation;

    this.runSwipeResponseAnimation(swipeDelta);
  }

  handleResponderRelease = (e) => {
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
        this.runMoveToDefaultPositionAnimation();
      }
    }

    this._currentResponderAction = null;
  }

  onCardTap = () => {
    if (this.state.inSwap) {
      return;
    }

    this.runRotateAnimation();
  }

  onSwipeLeft = async () => {
    return this.onSwipe(this.props.onSwipeLeft, true);
  }

  onSwipeRight = async () => {
    return this.onSwipe(this.props.onSwipeRight, false);
  }

  onSwipe = async (handler, directionLeft) => {
    if (handler) {
      await this.runSwipeAwayAnimation(directionLeft);

      let res = handler();

      if (res instanceof Promise) {
        res = await res;
      }

      if (res) {
        return;
      }
    }

    this.runMoveToDefaultPositionAnimation();
  }

  onEditStop = () => {
    this.runRotateAnimation();

    return false;
  }

  onChangeText = (newText) => {
    const { frontside, backside, onChange } = this.props;

    if (!onChange) {
      return;
    }

    const { faceFrontside } = this.state;
    const newValue = {
      frontside,
      backside,
    };

    newValue[faceFrontside ? 'frontside' : 'backside'] = newText;

    onChange(newValue);
  }

  renderText() {
    const { frontside, backside } = this.props;
    const { faceFrontside } = this.state;

    return (
      <Text style={[styles.cardText, {
        color: faceFrontside ? BACKSIDE_COLOR : FRONTSIDE_COLOR, 
      }]}>
        {faceFrontside ? frontside : backside}
      </Text>
    );
  }

  renderInput() {
    const { frontside, backside } = this.props;
    const { faceFrontside } = this.state;

    return (
      <TextInput
        placeholder="Enter card value"
        style={[styles.input, faceFrontside ? styles.frontInput : styles.backInput]}
        placeholderTextColor={faceFrontside ? BACKSIDE_COLOR : FRONTSIDE_COLOR}
        value={faceFrontside ? frontside : backside}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onEditStop}
      />
    );
  }

  renderContent() {
    const { frontside, backside, editable } = this.props;
    const { faceFrontside } = this.state;

    return (
      <View style={[styles.card, {
        backgroundColor: faceFrontside ? FRONTSIDE_COLOR : BACKSIDE_COLOR, 
      }]}>
        {editable ? this.renderInput() : this.renderText()}
      </View>
    )
  }

  render() {
    const { frontside, backside, editable } = this.props;
    const { fade, scale, offsetX, rotation, faceFrontside } = this.state;

    return (
      <View
        onStartShouldSetResponder={isTrue}
        onMoveShouldSetResponder={isTrue}
        onResponderGrant={this.handleResponderGrant}
        onResponderMove={this.handleResponderMove}
        onResponderRelease={this.handleResponderRelease}
        onResponderReject={this.handleResponderReject}
      >
        <Animated.View 
          style={{ 
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
          }}
        >
          {this.renderContent()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
  },
  input: {
    height: 40, 
    borderColor: 'transparent', 
    borderWidth: 1,
    minWidth: 100, 
  },
  frontInput: {
    borderBottomColor: BACKSIDE_COLOR, 
    color: BACKSIDE_COLOR,
  },
  backInput: {
    borderBottomColor: FRONTSIDE_COLOR, 
    color: FRONTSIDE_COLOR,
  }
});

export default AnimatedCard;