const mongoose = require('mongoose');

class MongooseService {

  constructor(database, databaseName) {
    this.database = database
    this.databaseName = databaseName
    this.connection = database.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/' + databaseName)
    this.once = this.once.bind(this)
  }

  once(type, cb) {
    this.connection.once(type, cb())
  }
}

module.exports = new MongooseService(mongoose, "socialmedia")

