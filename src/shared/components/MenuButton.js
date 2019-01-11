import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight, View, Image, StyleSheet,
} from 'react-native';
import Label from './Label';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Popup from './Popup';

class MenuButton extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      onPress: PropTypes.func,
      label: PropTypes.string.isRequired,
    })),
    icon: PropTypes.number,
    label: PropTypes.string,
  }

  state = {
    visible: false,
  }

  handlePress = () => {
    this.setState({
      visible: true,
    });
  }

  close = () => {
    this.setState({
      visible: false,
    });
  }

  onItemPress = (index) => {
    const { items } = this.props;

    if (items[index].onPress) {
      items[index].onPress();
    }

    this.close();
  }

  renderContent = () => {
    const { items } = this.props;

    return (
      <Menu>
        {items.map(({ label }, index) => (
          <MenuItem label={label} key={label} id={index} onPress={this.onItemPress} />
        ))}
      </Menu>
    );
  }

  render() {
    const { icon, label } = this.props;
    const { visible } = this.state;

    return (
      <Popup
        close={this.close}
        visible={visible}
        content={this.renderContent}
      >
        {({ targetRef }) => (
          <TouchableHighlight onPress={this.handlePress}>
            <View style={styles.button} ref={targetRef}>
              {icon ? <Image style={styles.icon} source={icon} /> : <Label>{label}</Label>}
            </View>
          </TouchableHighlight>
        )}
      </Popup>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    overflow: 'visible',
  },
});

export default MenuButton;
