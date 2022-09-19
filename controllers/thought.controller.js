const UserService = require("../services/user.service")
const ThoughtService = require("../services/thought.service")


class ThoughtController {
  constructor(services) {
    this.services = services
  }
}


module.exports = new ThoughtController({ UserService, ThoughtService })
