const mongoose = require('mongoose');

class MongooseService {

  constructor(database, databaseName) {
    this.database = database
    this.databaseName = databaseName
    this.once = this.once.bind(this)
    this.connect = this.connect.bind(this)
  }

  connect() {
    this.database.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/' + this.databaseName, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  once(type, cb) {
    this.connect()
    this.database.connection.once(type, cb)
  }
}

module.exports = new MongooseService(mongoose, "socialmedia")

