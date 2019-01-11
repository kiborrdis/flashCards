import React from 'react';
import Trial from './containers/TrialContainer';

class TrialScreen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    };
  }

  render() {
    return <Trial {...this.props} />;
  }
}

export default TrialScreen;
