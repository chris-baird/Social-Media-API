const UserService = require("../services/user.service")

class UserController {
  constructor(service) {
    this.service = service
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
    this.createUser = this.createUser.bind(this)
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
    this.service.getSingleUser(req.params.userId).then((dbUserData) => {
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

  createUser(req, res) {
    this.service.createUser(req.body).then((dbUserData) => {
      res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = new UserController(UserService)