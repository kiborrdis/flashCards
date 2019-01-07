class Storage {
  constructor() {
    this._opened = false;
    this._statusListeners = [];
  }

  addStorageStatusListener (callback) {
    this._statusListeners.push(callback);

    return () => {
      this._statusListeners.splice(this._statusListeners.indexOf(callback), 1);
    }
  }

  open() {
    this._openStorage().then(this.handleStorageOpen);
  }

  _openStorage() {
    return Promise.resolve();
  }

  handleStorageOpen = () => {
    this._opened = true;

    this.triggerStatusListeners(this._opened);
  }

  triggerStatusListeners(value) {
    this._statusListeners.forEach(listener => listener(value));
  }

  close() {
    this._closeStorage().then(this.handleStorageClose);
  }

  _closeStorage() {
    return Promise.resolve();
  }

  handleStorageClose = () => {
    this._opened = false;

    this.triggerStatusListeners(this._opened);
  }

  isOpened() {
    return this._opened;
  }

  performAction(action) {
    return Promise.resolve();
  }
}

export default Storage;
