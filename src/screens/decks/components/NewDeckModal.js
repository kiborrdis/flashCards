import React from 'react';
import { StyleSheet, View, Text, TextInput, Modal, Alert, TouchableHighlight, Button } from 'react-native';

class NewDeckModal extends React.Component {
  state = {
    inputValue: '',
    showError: false,
  }

  onChangeText = (value) => {
    this.setState({ inputValue: value, showError: false });
  }

  onApply = () => {
    const { onApplyClick } = this.props;
    const { inputValue } = this.state;

    if (!inputValue) {
      this.setState({ showError: true });
    }

    if (onApplyClick) {
      onApplyClick(inputValue);

      this.onCancel();
    }
  }

  onCancel = () => {
    const { close } = this.props;

    if (close) {
      this.setState({ inputValue: '', showError: false });

      close();
    }
  }

  render() {
    const { visible } = this.props;
    const { inputValue, showError } = this.state;

    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={this.onCancel}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>New deck</Text>

            <TextInput
              style={{height: 40, borderColor: 'transparent', borderBottomColor: '#ccc', borderWidth: 1}}
              onChangeText={this.onChangeText}
              value={inputValue}
            />

            <View style={styles.footer} >
              <Button onPress={this.onCancel} color="#888" title="Cancel" />
              <Button onPress={this.onApply} title="Apply" />
            </View>
          </View>
        </View>
      </Modal>
      
    );
  }
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    margin: 20,
    minWidth: '80%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default NewDeckModal;