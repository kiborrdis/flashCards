import { Linking } from 'react-native';
import { Navigation } from "react-native-navigation";
import { makeStackUsingChildScreenAndOptions, makeNewCardScreen, makeDecksScreen } from 'shared/navigation';
import Preferences from 'shared/preferences';
import screens from './screens';
import AppStateWatcher from 'shared/utils/AppStateWatcher';
import withRootContainers from './containers/withRootContainers';
import appRootOptions from './appRootOptions';
import Database from './storage/Database';
import DatabaseStorage from './storage/DatabaseStorage';

const DATABASE_NAME = 'memoCard.db';
const DATABASE_LOCATION = 'default';
const APP_PREFERENCES_KEY = 'prefs';

const defaultPreferences = {
  shareDeckId: 1,
};

let appStateWatcher;
let appPreferences; 

export default function startApp() {
  const storage = createStorage();
  appPreferences = new Preferences(APP_PREFERENCES_KEY, defaultPreferences);

  registerScreens(appPreferences, storage);

  Navigation.events().registerAppLaunchedListener(() => Promise.all([ 
    waitForInitialUrl(),
    appPreferences.load(),
  ]).then(([ url, preferences ]) => {
    bootstrapApp(url, { preferences, storage });
  }));
}

function createStorage() {
  return new DatabaseStorage(new Database(DATABASE_NAME, DATABASE_LOCATION));
}

function registerScreens(preferences, storage) {
  screens.forEach((component, id) => {
    Navigation.registerComponent(id, () => withRootContainers(component, { preferences, storage }), () => component);
  })
}

function waitForInitialUrl() {
  return Linking.getInitialURL().catch((e) => {
    console.error('Initial URL acquisition error', e);

    return null;
  })
}

function bootstrapApp(url, { preferences, storage }) {
  storage.open();

  registerListeners({ preferences, storage });

  if (url) {
    loadUrlHandlingAppScreen(url, preferences.getItem('shareDeckId'));

    return;
  }

  loadDefaultAppScreen();
};

function registerListeners({ preferences, storage }) {
  AppStateWatcher.addEventListener('active', () => storage.open());
  AppStateWatcher.addEventListener('background', () => storage.close());

  Linking.addEventListener('url', ({ url }) => {
    loadUrlHandlingAppScreen(url, preferences.getItem('shareDeckId'));
  });
}

function loadDefaultAppScreen() {
  Navigation.setRoot({
    root: makeStackUsingChildScreenAndOptions(makeDecksScreen(), appRootOptions),
  });
}

function loadUrlHandlingAppScreen(url, shareDeckId) {
  Navigation.setRoot({
    root: makeNewCardScreen(shareDeckId, { 
      defaultFrontside: extractTextFromUrl(url),
      closeOnCardCreation: true,
    }),
  });
}

function extractTextFromUrl(url) {
  const [, text] = url.split(':');
  return text;
}
