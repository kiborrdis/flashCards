import React from 'react';
import { AppState } from 'react-native';
import StorageContext from 'shared/storage/storageContext';

class StorageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.storageStatusSubscription = props.storage.addStorageStatusListener(this.onStorageStatusChange);

    this.state = {
      initialized: props.storage.isOpened(),
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    this.storageStatusSubscription();
  }

  onStorageStatusChange = (storageOpened) => {
    this.setState({ initialized: storageOpened });
  }

  onAppComeForeground = () => {
    this.setState({ initialized: this.props.storage.isOpened() });
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.onAppComeForeground();
    }
  }

  render () {
    const { children, storage } = this.props;

    return (
      <StorageContext.Provider value={storage}>
        {children({ loaded: this.state.initialized })}
      </StorageContext.Provider>
    );
  }
}

export default StorageContainer;
