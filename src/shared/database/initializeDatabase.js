function createTables(transaction) {
    // transaction.executeSql(`DROP TABLE IF EXISTS Decks;`);
    // transaction.executeSql(`DROP TABLE IF EXISTS Cards;`);
    // transaction.executeSql(`DROP TABLE IF EXISTS Trials;`);
    // transaction.executeSql(`DROP TABLE IF EXISTS Version;`);

  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS Decks( 
      deckId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      createdAt INTEGER DEFAULT 0,
      updatedAt INTEGER DEFAULT 0
    );
  `);

  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS Cards(  
      cardId INTEGER PRIMARY KEY AUTOINCREMENT,  
      deckId INTEGER,  
      frontside TEXT,  
      backside TEXT,
      numberOfViews INTEGER DEFAULT 0,
      numberOfMatches INTEGER DEFAULT 0,
      createdAt INTEGER DEFAULT 0,
      updatedAt INTEGER DEFAULT 0

      REFERENCES Decks (deckId)
    );
  `);

  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS Trials(  
      trialId INTEGER PRIMARY KEY AUTOINCREMENT, 
      deckId INTEGER, 
      type TEXT DEFAULT 'default',  
      numberOfCards INTEGER,
      numberOfViewedCards INTEGER,
      numberOfMatchedCards INTEGER,
      createdAt INTEGER DEFAULT 0 

      REFERENCES Decks (deckId)
    );
  `);

  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS Version(  
      version_id INTEGER PRIMARY KEY NOT NULL,  
      version INTEGER 
    );
  `);
}

export default function initializeDatabase(database) {
  return database.transaction(createTables).catch(() => { console.log('error'); });
}
