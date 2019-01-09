import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';

class Popup extends React.Component {
  static defaultProps = {
    placement: 'center-bottom',
  }

  state = {
    contentWidth: 0
  }

  targetRef = React.createRef();
  targetOffsetRelativeToWindow = {
    x: 0,
    y: 0,
  }

  componentDidUpdate() {
    if (!this.targetRef || !this.targetRef.current) {
      throw new Error('Target ref for popup wasnt set');
    }

    this.targetRef.current.measureInWindow((x, y, width, height) => {
      this.targetOffsetRelativeToWindow = {
        x,
        y,
      };
      this.targetWidth = width;
      this.targetHeight = height;
    });
  }

  onContentLayout = (event) => {
    this.setState({
      contentWidth: event.nativeEvent.layout.width,
    });
  }

  calculateDesiredPopupPositionRelativeToTarget() {
    const { contentWidth } = this.state;
    const { placement } = this.props;
    const position = {
      x: 0,
      y: 0,
    };

    if (placement.match('center')) {
      position.x = Math.floor(this.targetWidth / 2) - Math.floor(contentWidth / 2) + this.targetOffsetRelativeToWindow.x;
    }

    if (placement.match('bottom')) {
      position.y = this.targetHeight + this.targetOffsetRelativeToWindow.y;
    }


    return position;
  }

  correctXPosition(desiredXPosition) {
    const deviceWidth = Dimensions.get('window').width;
    const { contentWidth } = this.state;
    console.log('correction', desiredXPosition, deviceWidth, contentWidth);

    const correctedXPosition = Math.max(0, Math.min(desiredXPosition, deviceWidth - contentWidth));
    console.log('end correction', correctedXPosition)
    return correctedXPosition;  
  }

  getPopupPositionStyles = () => {
    const desiredPosition = this.calculateDesiredPopupPositionRelativeToTarget();

    return {
      left: this.correctXPosition(desiredPosition.x),
      top: desiredPosition.y,
    }
  }

  renderModal() {
    const { visible, close, position, content } = this.props;

    if (!visible) {
      return null;
    }

    return <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={close}
    >
      <View style={[styles.popup, this.getPopupPositionStyles()]} onLayout={this.onContentLayout}>
        { visible ? content() : null }
      </View>
      <View style={styles.popupOverlay}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.overlayTouchable}>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>;
  }

  render() {
    const { content: Content, children } = this.props;

    return (
      <React.Fragment>
        {children({ targetRef: this.targetRef })}
        {this.renderModal()}
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  popupOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 0, 0, 0)',
  },
  overlayTouchable: {
    width: '100%',
    height: '100%',
  },
  popup: {
    position: 'absolute',
    zIndex: 1,
    shadowColor: 'black',
    shadowRadius: 50,
    shadowOpacity: 0.5
  },

});

export default Popup;
