function createTables(transaction) {
    // transaction.executeSql(`DROP TABLE IF EXISTS Deck;`);
    // transaction.executeSql(`DROP TABLE IF EXISTS Card;`);
    // transaction.executeSql(`DROP TABLE IF EXISTS Version;`);

  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS Deck( 
      deckId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `);

  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS Card(  
      cardId INTEGER PRIMARY KEY AUTOINCREMENT,  
      deckId INTEGER,  
      frontside TEXT,  
      backside TEXT
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
