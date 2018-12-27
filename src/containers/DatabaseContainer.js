import React from 'react';
import { AppState } from 'react-native';
import database from 'memoCards/src/shared/database/Database';

class DatabaseContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: database.isOpened(),
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);


    if (!this.state.initialized) {
     this.openDatabase();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  openDatabase() {
    database.open().then(() => {
      this.setState({ initialized: true });
    });
  }

  closeDatabase() {
    database.close().then(() => {
      // do something about it
    });
  }

  onAppComeForeground = () => {
    this.openDatabase();
  }

  onAppComeBackground = () => {
    this.closeDatabase();
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.onAppComeForeground();
    }

    if (this.state.appState.match(/inactive|active/) && nextAppState === 'background') {
      this.onAppComeBackground();
    }
  }

  render () {
    const { children } = this.props;

    return children({ loaded: this.state.initialized, });
  }
}

export default DatabaseContainer;
