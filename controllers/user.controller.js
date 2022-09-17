const UserService = require("../services/user.service")
const ThoughtService = require("../services/thought.service")

class UserController {
  constructor(services) {
    this.services = services
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.addFriend = this.addFriend.bind(this)
    this.removeFriend = this.removeFriend.bind(this)
  }

  async getUsers(req, res) {
    try {
      const dbUserData = await this.services.UserService.getUsers()

      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getSingleUser(req, res) {
    try {
      const dbUserData = await this.services.UserService.getSingleUser(req.params.userId)

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createUser(req, res) {
    try {
      const dbUserData = await this.services.UserService.createUser(req.body)

      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateUser(req, res) {
    try {
      const dbUserData = await this.services.UserService.updateUser(req.params.userId, req.body)

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await this.services.UserService.deleteUser(req.params.userId)

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      await this.services.ThoughtService.removeReaction(deletedUser)

      await this.services.UserService.deleteUserFromFriends(req.params.userId)

      return res.json({ message: 'User and associated thoughts deleted!' });
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

  async addFriend(req, res) {
    try {
      const dbUserData = await this.services.UserService.addFriend(req.params.userId, req.params.friendId)

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async removeFriend(req, res) {
    try {
      const dbUserData = await this.services.UserService.removeFriend(req.params.userId, req.params.friendId)

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (error) {

    }
  }
}

module.exports = new UserController({ UserService, ThoughtService })