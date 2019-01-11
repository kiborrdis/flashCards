import React from 'react';
import { Navigation } from 'react-native-navigation';
import PromptModal from './components/PromptModal';

class PromptScreen extends React.Component {
  static options(passProps) {
    return {
      layout: {
        backgroundColor: 'transparent',
      },
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overCurrentContext',
    };
  }

  close = () => {
    Navigation.dismissModal(this.props.componentId);
  }

  render() {
    const { onApply, title } = this.props;

    return <PromptModal close={this.close} onApply={onApply} title={title} />;
  }
}

export default PromptScreen;
