/* eslint-disable class-methods-use-this */

class Storage {
  constructor() {
    this.opened = false;
    this.statusListeners = [];
  }

  addStorageStatusListener(callback) {
    this.statusListeners.push(callback);

    return () => {
      this.statusListeners.splice(this.statusListeners.indexOf(callback), 1);
    };
  }

  open() {
    this.openStorage().then(this.handleStorageOpen);
  }

  openStorage() {
    return Promise.resolve();
  }

  handleStorageOpen = () => {
    this.opened = true;

    this.triggerStatusListeners(this.opened);
  }

  triggerStatusListeners(value) {
    this.statusListeners.forEach(listener => listener(value));
  }

  close() {
    this.closeStorage().then(this.handleStorageClose);
  }

  closeStorage() {
    return Promise.resolve();
  }

  handleStorageClose = () => {
    this.opened = false;

    this.triggerStatusListeners(this.opened);
  }

  isOpened() {
    return this.opened;
  }

  performAction(action) {
    return Promise.resolve(action);
  }
}

export default Storage;
