import { TOPBAR_COLOR, TEXT_COLOR } from '../styles';

export const CARD = 'memoCards.card';
export const CARDS = 'memoCards.cards';
export const DECKS = 'memoCards.decks';
export const PROMPT = 'memoCards.promptModal';
export const NEW_CARD = 'memoCards.newCard';
export const TRIAL = 'memoCards.trial';
export const DECK_CARDS = 'memoCards.deckCards';
export const DECK_STATS = 'memoCards.deckStats';

export function makeStackUsingChildScreenAndOptions(rootChild, options) {
  return { 
    stack: {
      children: [
        rootChild,
      ],
      options,
    }
  }
}

export function makeDecksScreen() {
  return {
    component: {
      id: 'decks',
      name: DECKS,
    }
  };
}

export function makeNewCardScreen(deckId, { defaultFrontside, defaultBackside, closeOnCardCreation } = {}) {
  return {
    component: { 
      name: NEW_CARD,
      passProps: {
        deckId,
        defaultFrontside,
        defaultBackside,
        closeOnCardCreation,
      },
    },
  };
}

export function makeCardsOfDeckScreen(deckId) {
  return {
    component: { 
      name: CARDS,
      passProps: {
        deckId,
      },
    },
  };
};

export function makeDeckScreen(deckId) {
  const parentComponentId = `deck:${deckId}`;

  const bottomTabs = {
    id: parentComponentId,
    children: [
      {
        component: {
          name: DECK_STATS,
          passProps: { 
            deckId, 
            parentComponentId,
          },
          options: {
            bottomTab: {
              text: 'Stats',
              textColor: TEXT_COLOR,
              selectedTextColor: TEXT_COLOR,
              icon: require('../logo.png'),
            }
          }
        }
      },
      {
        component: {
          name: DECK_CARDS,
          passProps: { 
            deckId, 
            parentComponentId,
          },
          options: {
            bottomTab: {
              text: 'List',
              textColor: TEXT_COLOR,
              selectedTextColor: TEXT_COLOR,
              icon: require('../logo.png'),
            }
          }
        }
      },
    ],
    options: {
      bottomTabs: {
        backgroundColor: TOPBAR_COLOR,
      },
      topBar: {
        title: {
          text: 'Cards',
        },
        rightButtons: [
          {
            id: 'addCardButton',
            icon: require('../icons/plus.png'),
          },
        ],
      }
    }
  };

  return {
    bottomTabs,
  };
}

export function makePromptScreen({ title, onApply }) {
  return {
    component: { 
      name: PROMPT,
      passProps: {
        title,
        onApply,
      },
    },
  };
};

export function makeTrialScreen(trialId) {
  return {
    component: { 
      name: TRIAL,
      passProps: {
        trialId,
      },
    },
  };
};



