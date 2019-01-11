import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Label from './Label';

class MenuItem extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  onPress = () => {
    const { onPress, id } = this.props;

    if (onPress) {
      onPress(id);
    }
  }

  render() {
    const { label } = this.props;

    return (
      <TouchableHighlight onPress={this.onPress}>
        <View style={styles.item}>
          <Label>{label}</Label>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 40,
    padding: 10,
  },
});

export default MenuItem;
