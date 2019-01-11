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

  openStorage() {
    return this.database.open();
  }

  closeStorage() {
    return this.database.close();
  }

  performAction(actionFunc) {
    const executor = new DatabaseStorageExecutor(this.database);

    return actionFunc(executor);
  }
}

export default DatabaseStorage;
