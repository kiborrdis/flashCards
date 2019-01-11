import SQLite from 'react-native-sqlite-storage';
import initializeDatabase from './initializeDatabase';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

class Database {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.database = null;
    this.opened = false;
    this.statusListeners = [];
  }

  async open() {
    if (this.opened) {
      return Promise.resolve(this.database);
    }

    const db = await SQLite.openDatabase({ name: this.name, location: this.location });
    await initializeDatabase(db);
    this.onDatabaseOpenSuccess(db);

    return db;
  }

  async execute(executor, { query, args }) {
    return executor.executeSql(query, args).then(this.processSqlExecutionResult);
  }

  async executeQuery(queryDescription) {
    if (!this.opened) {
      throw new Error('Impossible to execute sql. Database is not opened');
    }

    return this.execute(this.database, queryDescription);
  }

  processQueryExecutionResult = (results) => {
    const singleResult = results[0];

    if (singleResult.insertId !== undefined) {
      return singleResult.insertId;
    }

    return this.extractRowItemsFromResult(singleResult);
  }


  processSqlExecutionResult = (results) => {
    const singleResult = results[0].db ? results[1] : results[0];

    if (singleResult.insertId !== undefined) {
      return singleResult.insertId;
    }

    return this.extractRowItemsFromResult(singleResult);
  }

  extractRowItemsFromResult = (result) => {
    const { item, length } = result.rows;
    const extractedRows = [];

    for (let i = 0; i < length; i += 1) {
      extractedRows.push(item(i));
    }

    return extractedRows;
  }

  close() {
    if (!this.database) {
      return Promise.resolve();
    }

    return this.database.close().then(this.onDatabaseCloseSuccess).catch((error) => {
      throw new Error(error);
    });
  }

  onDatabaseCloseSuccess = () => {
    this.opened = false;

    this.database = null;

    this.triggerStatusListeners(this.opened);
  }

  onDatabaseOpenSuccess = (db) => {
    this.database = db;

    this.opened = true;

    this.triggerStatusListeners(this.opened);
  }

  triggerStatusListeners(value) {
    this.statusListeners.forEach(listener => listener(value));
  }

  addDatabaseStatusListener(callback) {
    this.statusListeners.push(callback);

    return () => {
      this.statusListeners.splice(this.statusListeners.indexOf(callback), 1);
    };
  }

  isOpened() {
    return !!this.database;
  }
}

export default Database;
