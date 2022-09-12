const { deleteUser } = require("../services/user.service")
const UserService = require("../services/user.service")

class UserController {
  constructor(service) {
    this.service = service
    this.getUsers = this.getUsers.bind(this)
    this.getSingleUser = this.getSingleUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
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

  updateUser(req, res) {
    return this.service.updateUser(req.params.userId, req.body).then((dbUserData) => {
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

  deleteUser(req, res) {
    this.service.deleteUser(req.params.userId).then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
    })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = new UserController(UserService)