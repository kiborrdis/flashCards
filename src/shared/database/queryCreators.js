export function createCardInDeck(deckId, {
  frontside,
  backside,
}) {
  return {
    query: `INSERT INTO Card (deckId, frontside, backside) VALUES (?, ?, ?)`,
    args: [deckId, frontside, backside],
  };
}

export function getCardsFromDeck(deckId) {
  return {
    query: `SELECT cardId, frontside, backside FROM Card WHERE deckId = ?`,
    args: [deckId],
  };
}

export function createDeck(name) {
  return {
    query: `INSERT INTO Deck (name) VALUES (?)`,
    args: [name],
  };
}

export function getDecks() {
  return {
    query: `
      SELECT deckId, name FROM Deck
    `,
  }
}