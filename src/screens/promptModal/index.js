import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import PromptModal from './components/PromptModal';

class PromptScreen extends React.Component {
  static propTypes = {
    onApply: PropTypes.func,
    title: PropTypes.string,
    componentId: PropTypes.string.isRequired,
  }

  static options() {
    return {
      layout: {
        backgroundColor: 'transparent',
      },
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overCurrentContext',
    };
  }

  close = () => {
    const { componentId } = this.props;

    Navigation.dismissModal(componentId);
  }

  render() {
    const { onApply, title } = this.props;

    return <PromptModal close={this.close} onApply={onApply} title={title} />;
  }
}

export default PromptScreen;
