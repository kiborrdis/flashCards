import React from 'react';
import {
  StyleSheet, View, Text, TextInput, Modal, Alert, TouchableHighlight, Button,
} from 'react-native';
import ModalLayout from 'memoCards/src/shared/components/ModalLayout';

class PromptModal extends React.Component {
  state = {
    inputValue: '',
    showError: false,
  }

  onChangeText = (value) => {
    this.setState({ inputValue: value, showError: false });
  }

  onApply = () => {
    const { onApply } = this.props;
    const { inputValue } = this.state;

    if (!inputValue) {
      this.setState({ showError: true });
    }

    if (onApply) {
      onApply(inputValue);

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
    const { title } = this.props;
    const { inputValue, showError } = this.state;

    return (
      <ModalLayout onApply={this.onApply} onCancel={this.onCancel} title={title}>
        <TextInput
          style={{
            height: 40, borderColor: 'transparent', borderBottomColor: '#ccc', borderWidth: 1,
          }}
          onChangeText={this.onChangeText}
          value={inputValue}
        />
      </ModalLayout>
    );
  }
}

export default PromptModal;
