import { Navigation } from "react-native-navigation";
import Card from './card';
import Cards from './cards';
import Decks from './decks';

export const CARD = 'memoCards.card';
export const CARDS = 'memoCards.cards';
export const DECKS = 'memoCards.decks';

export const screens = new Map();

screens.set(CARD, Card);
screens.set(CARDS, Cards);
screens.set(DECKS, Decks);

const topBarOptions = {
  background: {
    color: 'black',
  },
  title: {
    text: 'Decks',
    color: 'white',
  },
  backButton: {
    color: 'white',
  },
};
// icon: require('./iconName1.png'),
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

export const screensConfig = bottomTabsConfig;

// bottomTabs: {
//   id: 'ROOT',
//   children: [
//     { 
//       stack: {
//         children: [
//           {
//             component: {
//               name: DECKS,
//             }
//           }
//         ],
//         options: {
//           topBar: topBarOptions
//         }
//       }
//     }
//   ],
// }