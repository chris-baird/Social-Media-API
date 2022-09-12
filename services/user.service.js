const { User } = require("../models")

class UserService {
  constructor(models) {
    this.models = models
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
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
}

module.exports = new UserService({ User })