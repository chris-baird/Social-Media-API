const { User } = require("../models")

class UserService {
  constructor(models) {
    this.models = models
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.addFriend = this.addFriend.bind(this)
    this.removeFriend = this.removeFriend.bind(this)
    this.deleteUserFromFriends = this.deleteUserFromFriends.bind(this)
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

  updateUser(id, user) {
    return this.models.User.findOneAndUpdate(
      { _id: id },
      {
        $set: user,
      },
      {
        runValidators: true,
        new: true,
      }
    )
  }

  deleteUser(id) {
    return this.models.User.findOneAndDelete({ _id: id })
  }

  deleteUserFromFriends(userId) {
    return this.models.User.updateMany({}, { $pull: { friends: { $in: [userId] } } })
  }

  addFriend(userId, friendId) {
    return this.models.User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true })
  }

  removeFriend(userId, friendId) {
    return this.models.User.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { new: true })
  }

}

module.exports = new UserService({ User })