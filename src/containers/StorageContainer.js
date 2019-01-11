import React from 'react';
import PropTypes from 'prop-types';
import { AppState } from 'react-native';
import StorageContext from 'shared/storage/storageContext';

class StorageContainer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    storage: PropTypes.shape({
      isOpened: PropTypes.func.isRequired,
      addStorageStatusListener: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.storageStatusSubscription = props.storage.addStorageStatusListener(
      this.onStorageStatusChange,
    );

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
    const { storage } = this.props;

    this.setState({ initialized: storage.isOpened() });
  }

  handleAppStateChange = (nextAppState) => {
    const { appState } = this.state;

    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.onAppComeForeground();
    }
  }

  render() {
    const { children, storage } = this.props;
    const { initialized } = this.state;

    return (
      <StorageContext.Provider value={storage}>
        {children({ loaded: initialized })}
      </StorageContext.Provider>
    );
  }
}

export default StorageContainer;
