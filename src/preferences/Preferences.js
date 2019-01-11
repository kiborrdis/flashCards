import { AsyncStorage } from 'react-native';

class Preferences {
  constructor(key, defaultPreferences = {}) {
    this.key = key;
    this.loaded = false;
    this.data = null;
    this.defaultPreferences = defaultPreferences;
  }

  async load() {
    try {
      const rawData = await AsyncStorage.getItem(this.key);

      if (rawData) {
        this.deserialize(rawData);
      } else {
        this.data = this.defaultPreferences;
      }
    } catch (error) {
      this.data = this.defaultPreferences;

      console.warn('Failed to load preferences', error);
    }

    this.loaded = true;

    return this;
  }

  deserialize(rawPreferences) {
    this.data = JSON.parse(rawPreferences);
  }

  hasItem(key) {
    return this.data[key] !== undefined;
  }

  getItem(key) {
    if (!this.isLoaded()) {
      throw new Error('Cant getItem from preferences, preferences not loaded');
    }

    return this.data[key];
  }

  isLoaded() {
    return this.loaded;
  }

  setItem(key, value) {
    if (!this.isLoaded()) {
      throw new Error('Cant setItem for preferences, preferences not loaded');
    }
    console.log('preferences', key, value);

    this.data = { ...this.data, [key]: value };

    this.save();
  }

  async save() {
    console.log('save preferences', this.key, this.serialize());

    try {
      await AsyncStorage.setItem(this.key, this.serialize());
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  }

  serialize() {
    return JSON.stringify(this.data);
  }
}

export default Preferences;
