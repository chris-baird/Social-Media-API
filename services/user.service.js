const { User } = require("../models")

class UserService {
  constructor(models) {
    this.models = models
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  getUsers() {
    return this.models.User.find()
      .select('-__v')
  }

  getSingleUser(id) {
    return this.models.User.findOne({ _id: id })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
  }

  createUser(user) {
    return this.models.User.create(user)
  }
}

module.exports = new UserService({ User })