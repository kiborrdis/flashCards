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

export function getCard(cardId) {
  return {
    query: `SELECT cardId, frontside, backside FROM Cards WHERE cardId = ?`,
    args: [cardId],
  };
}


export function getCardsFromDeck(deckId) {
  return {
    query: `
      SELECT 
        cardId, 
        frontside, 
        backside 
      FROM Cards 
      WHERE 
        deckId = ? AND
        deletedAt IS NULL 
    `,
    args: [deckId],
  };
}

export function getDecks() {
  return {
    query: `
      SELECT 
        deckId, 
        name,
        (SELECT COUNT(*) FROM Cards WHERE Cards.deckId = Decks.deckId AND Cards.deletedAt IS NOT NULL) AS numberOfCards 
      FROM Decks
      WHERE
        deletedAt IS NULL 
    `,
  }
};

export function getDeckStats(deckId) {
  return {
    query: `
      SELECT 
        deckId, 
        name,
        (SELECT COUNT(*) FROM Cards WHERE Cards.deckId = Decks.deckId AND Cards.deletedAt IS NOT NULL) AS numberOfCards,
        (SELECT COUNT(*) FROM Trials WHERE Trials.deckId = Decks.deckId) AS numberOfTrials,
        (SELECT COUNT(*) FROM Cards WHERE Cards.deckId = Decks.deckId AND Cards.numberOfViews > 10 AND Cards.deletedAt IS NOT NULL) AS numberOfLearnedCards
      FROM Decks
      WHERE
        deckId = ?
    `,
    args: [deckId]
  }
}

export function createTrial(deckId, type = 'default', numberOfCards = 20) {
  return {
    query: `INSERT INTO 
      Trials (deckId, type, numberOfCards, createdAt) 
      VALUES (?, ?, ?, ?)
    `,
    args: [deckId, type, numberOfCards, new Date().getTime()],
  };
}

export function getTrial(trialId) {
  return {
    query: `
      SELECT
        deckId,
        type,
        numberOfCards
      FROM Trials
      WHERE
        trialId = ?
    `,
    args: [trialId],
  };
}

export function getTrialCardsFromDeck(deckId, numberOfCards) {
  return {
    query: `
      SELECT
        cardId,
        frontside,
        backside,
        numberOfViews,
        numberOfMatches
      FROM Cards
      WHERE
        deckId = ? AND
        deletedAt IS NULL 
      ORDER BY numberOfViews ASC
      LIMIT ?
    `,
    args: [deckId, numberOfCards],
  };
};

export function getLastTrialForDeck(deckId) {
  return {
    query: `
      SELECT
        trialId,
        type,
        numberOfCards,
        numberOfViewedCards,
        numberOfMatchedCards,
        createdAt
      FROM Trials
      WHERE
        deckId = ?
      ORDER BY createdAt DESC
      LIMIT 1
    `,
    args: [deckId],
  };
}

export function updateCardSides(cardId, { frontside, backside }) {
  return {
    query: `
      UPDATE Cards
      SET
        frontside = ?,
        backside = ?
      WHERE
        cardId = ?
    `,
    args: [frontside, backside, cardId],
  };
}

export function updateCardViewAndMatch(cardId, match) {
  return {
    query: `
      UPDATE Cards
      SET
        numberOfViews = numberOfViews + 1
        ${ match ? `,numberOfMatches = numberOfMatches + 1` : ''}
      WHERE
        cardId = ?
    `,
    args: [cardId],
  };
}

export function updateTrialViewAndMatch(trialId, viewedNumber, matchedNumber) {
  return {
    query: `
      UPDATE Trials
      SET
        numberOfViewedCards = numberOfViewedCards + ?,
        numberOfMatchedCards = numberOfMatchedCards + ?
      WHERE
        trialId = ?
    `,
    args: [viewedNumber, matchedNumber, trialId],
  };
}

export function deleteDeck(deckId) {
  return {
    query: `
      UPDATE Decks
      SET
        deletedAt = ?
      WHERE
        deckId = ?
    `,
    args: [new Date().getTime(), deckId],
  }
}

export function deleteCard(cardId) {
  return {
    query: `
      UPDATE Cards
      SET
        deletedAt = ?
      WHERE
        cardId = ?
    `,
    args: [new Date().getTime(), cardId],
  }
}

export function updateDeck(deckId, { name }) {
  return {
    query: `
      UPDATE Decks
      SET
        updatedAt = ?,
        name = ?
      WHERE
        deckId = ?
    `,
    args: [new Date().getTime(), name, deckId],
  };
}
