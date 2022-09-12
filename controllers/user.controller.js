const UserService = require("../services/user.service")

class UserController {
  constructor(service) {
    this.service = service
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
  }

  getUsers(req, res) {
    this.service.getUsers().then((dbUserData) => {
      res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  getSingleUser(req, res) {
    this.service.getSingleUser().then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = new UserController(UserService)