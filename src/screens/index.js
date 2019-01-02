import { Navigation } from 'react-native-navigation';
import { TOPBAR_COLOR, TEXT_COLOR } from 'shared/styles';
import Card from './card';
import Cards from './cards';
import Decks from './decks';
import PromptModal from './promptModal';
import { CARD, CARDS, DECKS, PROMPT } from 'memoCards/src/shared/navigation';

export const screens = new Map();

screens.set(CARD, Card);
screens.set(CARDS, Cards);
screens.set(DECKS, Decks);
screens.set(PROMPT, PromptModal);

const topBarOptions = {
  background: {
    color: TOPBAR_COLOR,
  },
  title: {
    color: TEXT_COLOR,
  },
  backButton: {
    color: TEXT_COLOR,
  },
};

const stackConfig = { 
  stack: {
    children: [
      {
        component: {
          id: 'decks',
          name: DECKS,
        }
      },
    ],
    options: {
      topBar: topBarOptions,
      bottomTab: {
        text: 'Tab 1',
        testID: 'TEST_TAB',
        icon: require('../logo.png'),
      }
    },
  }
};

const cardsConfig = { 
  stack: {
    children: [
      {
        component: {
          id: 'cards',
          name: CARDS,
        }
      },
    ],
    options: {
      topBar: topBarOptions,
      bottomTab: {
        text: 'Tab 2',
        testID: 'TEST2_TAB',
        icon: require('../logo.png'),
      }
    },
  }
};

const bottomTabsConfig = { 
  bottomTabs: {
    id: 'ROOT',
    children: [
      stackConfig,
      cardsConfig
    ],
  }
};

export const screensConfig = stackConfig;
