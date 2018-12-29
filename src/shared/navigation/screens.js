export const CARD = 'memoCards.card';
export const CARDS = 'memoCards.cards';
export const DECKS = 'memoCards.decks';
export const PROMPT = 'memoCards.promptModal';

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

