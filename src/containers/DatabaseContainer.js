import React from 'react';
import { AppState } from 'react-native';
import { Navigation } from "react-native-navigation";
import database from 'memoCards/src/shared/database/Database';

class DatabaseContainer extends React.Component {
  constructor(props) {
    super(props);

    this._dbStatusSubscription = database.addDatabaseStatusListener(this.onDatabaseStatusChange);

    this.state = {
      initialized: database.isOpened(),
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    this._dbStatusSubscription();
  }

  onDatabaseStatusChange = (databaseOpened) => {
    this.setState({ initialized: databaseOpened });
  }

  onAppComeForeground = () => {
    this.setState({ initialized: database.isOpened() });
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.onAppComeForeground();
    }
  }

  render () {
    const { children } = this.props;

    return children({ loaded: this.state.initialized, });
  }
}

export default DatabaseContainer;
