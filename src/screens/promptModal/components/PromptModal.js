import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import ModalLayout from 'shared/components/ModalLayout';

class PromptModal extends React.Component {
  static propTypes = {
    onApply: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
  }

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
      <ModalLayout
        showError={showError}
        onApply={this.onApply}
        onCancel={this.onCancel}
        title={title}
      >
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
