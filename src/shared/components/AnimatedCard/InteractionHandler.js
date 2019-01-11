import React from 'react';
import { View } from 'react-native';

const SWIPE_CALLBACK_THRESHOLD = 100;
const isTrue = () => true;

class InteractionHandler extends React.Component {
  static defaultProps = {
    onTap: () => {},
    onSwipe: () => {},
    onMove: () => {},
    onMoveEnd: () => {},
  }

  handleResponderGrant = (e) => {
    this._currentResponderAction = {
      type: 'tap',
      initialPosition: {
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY,
      },
    };
  }

  handleResponderMove = (event) => {
    const { onMove } = this.props;

    if (this._currentResponderAction.type === 'tap') {
      this._currentResponderAction.type = 'move';
    }

    onMove({
      ...this._currentResponderAction,
      offset: this.calculateOffsetFromNativeEvent(event.nativeEvent),
      swipe: this.isSwipeBasedOnNativeEvent(event.nativeEvent),
    });
  }

  calculateOffsetFromNativeEvent(nativeEvent) {
    return {
      x: nativeEvent.pageX - this._currentResponderAction.initialPosition.x,
      y: nativeEvent.pageY - this._currentResponderAction.initialPosition.y,
    };
  }

  handleResponderRelease = (event) => {
    const { onSwipe, onMoveEnd, onTap } = this.props;

    if (this._currentResponderAction.type === 'tap') {
      onTap();
    }

    if (this._currentResponderAction.type === 'move') {
      const offset = this.calculateOffsetFromNativeEvent(event.nativeEvent);

      if (this.isSwipeBasedOnNativeEvent(event.nativeEvent)) {
        onSwipe(offset.x > 0 ? 'right' : 'left');
      } else {
        onMoveEnd();
      }
    }

    this._currentResponderAction = null;
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
