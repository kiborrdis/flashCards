import React from 'react';
import {
  TouchableHighlight, View, Text, Image, StyleSheet,
} from 'react-native';
import Label from './Label';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Popup from './Popup';

class MenuButton extends React.PureComponent {
  state = {
    popupOpened: false,
  }

  handlePress = (event) => {
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
          <MenuItem label={label} key={index} id={index} onPress={this.onItemPress} />
        ))}
      </Menu>
    );
  }

  render() {
    const { icon, label } = this.props;

    return (
      <Popup
        close={this.close}
        visible={this.state.visible}
        content={this.renderContent}
      >
        {({ targetRef }) => (
          <TouchableHighlight onPress={this.handlePress}>
            <View style={styles.button} ref={targetRef}>
              {icon ? <Image style={styles.icon} source={icon} /> : <Label>{text}</Label>}
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
