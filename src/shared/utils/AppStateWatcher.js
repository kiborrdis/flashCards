import { AppState } from 'react-native';

class AppStateWatcher {
  constructor() {
    this.currentState = AppState.currentState;

    this.listeners = {};
  }

  startWatch() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.isAppComeActive(nextAppState)) {
      this.handleAppComeActive();
    }

    if (this.isAppComeBackground(nextAppState)) {
      this.handleAppComeBackground();
    }

    this.currentState = nextAppState;
  }

  isAppComeActive(nextAppState) {
    return this.currentState.match(/inactive|background/) && nextAppState === 'active';
  }

  isAppComeBackground(nextAppState) {
    return this.currentState.match(/inactive|active/) && nextAppState === 'background';
  }

  handleAppComeActive() {
    this.emitEvent('active');
  }

  handleAppComeBackground() {
    this.emitEvent('background');
  }

  addEventListener = (type, handler) => {
    const typeListeners = this.listeners[type] || [];

    this.listeners = {
      ...this.listeners,
      [type]: [...typeListeners, handler],
    };
  }

  removeEventListener = (type, handler) => {
    const newTypeListeners = this.listeners[type] || [];
    newTypeListeners.splice(newTypeListeners.indexOf(handler), 1);

    this.listeners = {
      ...this.listeners,
      [type]: newTypeListeners,
    };
  }

  emitEvent(type) {
    const typeListeners = this.listeners[type] || [];

    typeListeners.forEach(listener => listener());
  }
}

const appStateWatcher = new AppStateWatcher();
appStateWatcher.startWatch();

export default appStateWatcher;
