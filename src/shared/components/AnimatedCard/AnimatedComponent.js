import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Animation, FadeInAnimation, TransitionAnimation } from './Animation';

class AnimatedComponent extends React.Component {
  static propTypes = {
    appearAnimation: PropTypes.instanceOf(Animation),
    opacity: PropTypes.number,
    scale: PropTypes.number,
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    children: PropTypes.node.isRequired,
  }

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
    const {
      opacity, scale, rotationY, offsetX, offsetY,
    } = this.state;

    return {
      opacity,
      transform: [
        { scaleX: scale },
        { scaleY: scale },
        {
          rotateY: rotationY.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
          }),
        },
        { translateX: offsetX },
        { translateY: offsetY },
      ],
    };
  }

  render() {
    const { children } = this.props;

    return (
      <Animated.View style={this.constructAnimatedStyle()}>
        {children}
      </Animated.View>
    );
  }
}

export default AnimatedComponent;
