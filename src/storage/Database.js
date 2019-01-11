import SQLite from 'react-native-sqlite-storage';
import initializeDatabase from './initializeDatabase';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DATABASE_NAME = 'memoCard.db';
const DATABASE_LOCATION = 'default';

export class Database {
  constructor(name, location) {
    this._name = name;
    this._location = location;
    this._database = null;
    this._opened = false;
    this._statusListeners = [];
  }

  async open() {
    if (this._opened) {
      return Promise.resolve(this._database);
    }

    const db = await SQLite.openDatabase({ name: this._name, location: this._location });
    await initializeDatabase(db);
    this.onDatabaseOpenSuccess(db);

    return db;
  }

  async execute(executor, { query, args }) {
    return executor.executeSql(query, args).then(this.processSqlExecutionResult);
  }

  async executeQuery(queryDescription) {
    if (!this._opened) {
      throw new Error('Impossible to execute sql. Database is not opened');
    }

    return this.execute(this._database, queryDescription);
  }

  processQueryExecutionResult = (results) => {
    const singleResult = results[0];

    if (singleResult.insertId !== undefined) {
      return singleResult.insertId;
    }

    return this.extractRowItemsFromResult(singleResult);
  }


  processSqlExecutionResult = (results) => {
    // console.log('result', results);

    const singleResult = results[0].db ? results[1] : results[0];

    if (singleResult.insertId !== undefined) {
      return singleResult.insertId;
    }

    return this.extractRowItemsFromResult(singleResult);
  }

  extractRowItemsFromResult = (result) => {
    const { item, length } = result.rows;
    const extractedRows = [];

    for (let i = 0; i < length; i++) {
      extractedRows.push(item(i));
    }

    return extractedRows;
  }

  close() {
    if (!this._database) {
      return Promise.resolve();
    }

    return this._database.close().then(this.onDatabaseCloseSuccess).catch(() => console.log('foo'));
  }

  onDatabaseCloseSuccess = () => {
    this._opened = false;

    this._database = null;

    this.triggerStatusListeners(this._opened);
  }

  onDatabaseOpenSuccess = (db) => {
    this._database = db;

    this._opened = true;

    this.triggerStatusListeners(this._opened);
  }

  triggerStatusListeners(value) {
    this._statusListeners.forEach(listener => listener(value));
  }

  addDatabaseStatusListener(callback) {
    this._statusListeners.push(callback);

    return () => {
      this._statusListeners.splice(this._statusListeners.indexOf(callback), 1);
    };
  }

  isOpened() {
    return !!this._database;
  }
}

export default Database;
