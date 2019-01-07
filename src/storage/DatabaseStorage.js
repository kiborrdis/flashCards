import Storage from './Storage';

class DatabaseStorageExecutor {
  constructor(database) {
    this.database = database;
  }

  executeQuery(queryDescription) {
    return this.database.executeQuery(queryDescription);
  }
}

class DatabaseStorage extends Storage {
  constructor(database) {
    super();

    this.database = database;
  }

  _openStorage() {
    return this.database.open();
  }

  _closeStorage() {
    return this.database.close();
  }

  performAction(actionFunc) {
    const executor = new DatabaseStorageExecutor(this.database);

    return actionFunc(executor);
  }
}

export default DatabaseStorage;
