export function createCardInDeck(deckId, {
  frontside,
  backside,
}) {
  return {
    query: `INSERT INTO 
      Cards (deckId, frontside, backside, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [deckId, frontside, backside, new Date().getTime(), new Date().getTime()],
  };
}

export function createDeck(name) {
  return {
    query: `INSERT INTO 
      Decks (name, createdAt, updatedAt) 
      VALUES (?, ?, ?)
    `,
    args: [name, new Date().getTime(), new Date().getTime()],
  };
}

export function getCardsFromDeck(deckId) {
  return {
    query: `SELECT cardId, frontside, backside FROM Cards WHERE deckId = ?`,
    args: [deckId],
  };
}

export function getDecks() {
  return {
    query: `
      SELECT 
        deckId, 
        name,
        (SELECT COUNT(*) FROM Cards WHERE Cards.deckId = Decks.deckId) AS numberOfCards 
      FROM Decks
    `,
  }
};

export function getDeckStats(deckId) {
  return {
    query: `
      SELECT 
        deckId, 
        name,
        (SELECT COUNT(*) FROM Cards WHERE Cards.deckId = Decks.deckId) AS numberOfCards,
        (SELECT COUNT(*) FROM Trials WHERE Trials.deckId = Decks.deckId) AS numberOfTrials,
        (SELECT COUNT(*) FROM Cards WHERE Cards.deckId = Decks.deckId AND Cards.numberOfViews > 10) AS numberOfLearnedCards
      FROM Decks
      WHERE
        deckId = ?
    `,
    args: [deckId]
  }
}