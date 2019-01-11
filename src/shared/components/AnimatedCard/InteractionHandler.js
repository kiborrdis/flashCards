import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const SWIPE_CALLBACK_THRESHOLD = 100;
const isTrue = () => true;

class InteractionHandler extends React.Component {
  static propTypes = {
    onTap: PropTypes.func,
    onSwipe: PropTypes.func,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    onTap: () => {},
    onSwipe: () => {},
    onMove: () => {},
    onMoveEnd: () => {},
  }

  handleResponderGrant = (e) => {
    this.currentResponderAction = {
      type: 'tap',
      initialPosition: {
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY,
      },
    };
  }

  handleResponderMove = (event) => {
    const { onMove } = this.props;

    if (this.currentResponderAction.type === 'tap') {
      this.currentResponderAction.type = 'move';
    }

    onMove({
      ...this.currentResponderAction,
      offset: this.calculateOffsetFromNativeEvent(event.nativeEvent),
      swipe: this.isSwipeBasedOnNativeEvent(event.nativeEvent),
    });
  }

  calculateOffsetFromNativeEvent(nativeEvent) {
    return {
      x: nativeEvent.pageX - this.currentResponderAction.initialPosition.x,
      y: nativeEvent.pageY - this.currentResponderAction.initialPosition.y,
    };
  }

  handleResponderRelease = (event) => {
    const { onSwipe, onMoveEnd, onTap } = this.props;

    if (this.currentResponderAction.type === 'tap') {
      onTap();
    }

    if (this.currentResponderAction.type === 'move') {
      const offset = this.calculateOffsetFromNativeEvent(event.nativeEvent);

      if (this.isSwipeBasedOnNativeEvent(event.nativeEvent)) {
        onSwipe(offset.x > 0 ? 'right' : 'left');
      } else {
        onMoveEnd();
      }
    }

    this.currentResponderAction = null;
  }

  isSwipeBasedOnNativeEvent(nativeEvent) {
    const offset = this.calculateOffsetFromNativeEvent(nativeEvent);

    return Math.abs(offset.x) > SWIPE_CALLBACK_THRESHOLD;
  }

  render() {
    const { children } = this.props;

    return (
      <View
        onStartShouldSetResponder={isTrue}
        onMoveShouldSetResponder={isTrue}
        onResponderGrant={this.handleResponderGrant}
        onResponderMove={this.handleResponderMove}
        onResponderRelease={this.handleResponderRelease}
      >
        {children}
      </View>
    );
  }
}

export default InteractionHandler;
