const { User } = require("../models")

class UserService {
  constructor(models) {
    this.models = models
    this.getUsers = this.getUsers.bind(this)
  }

  getUsers() {
    return this.models.User.find()
      .select('-__v')
  }
}

module.exports = new UserService({ User })