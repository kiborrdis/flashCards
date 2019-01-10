import React from 'react';
import { TextInput, View, Text, Easing, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { FadeInAnimation, TransitionAnimation } from './Animation';

class AnimatedComponent extends React.Component {
  static defaultProps = {
    appearAnimation: new FadeInAnimation(),
    opacity: 1,
    scale: 1,
    offset: {
      x: 0,
      y: 0,
    },
  }

  state = {
    opacity: new Animated.Value(1),
    scale: new Animated.Value(1),
    rotationY: new Animated.Value(0),
    offsetX: new Animated.Value(0),
    offsetY: new Animated.Value(0),
    inSwap: false,
    faceFrontside: true,
  }

  constructor(props) {
    super(props);

    const { appearAnimation } = props;

    if (appearAnimation) {
      this.state = { ...this.state, ...appearAnimation.getStartVariables() };
    }
  }

  runAnimation(animation) {
    return animation.run(this.state);
  }

  componentDidMount() {
    const { appearAnimation } = this.props;

    if (appearAnimation) {
      appearAnimation.run(this.state);
    }
  }

  componentDidUpdate() {
    const { opacity, scale, offset } = this.props;

    const transition = new TransitionAnimation({
      opacity,
      scale,
      offsetX: offset.x,
      offsetY: offset.y,
    });

    transition.run(this.state);
  }

  constructAnimatedStyle() {
    const { opacity, scale, rotationY, offsetX, offsetY } = this.state;

    return { 
      opacity: opacity, 
      transform: [
        { scaleX: scale }, 
        { scaleY: scale },
        { rotateY: rotationY.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
          }) 
        },
        { translateX: offsetX },
        { translateY: offsetY },
      ],
    }
  }

  render() {
    const { children } = this.props;

    return (
      <Animated.View style={this.constructAnimatedStyle()}>
        {children}
      </Animated.View>
    )
  }
}

export default AnimatedComponent;