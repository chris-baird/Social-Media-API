const UserService = require("../services/user.service")
const ThoughtService = require("../services/thought.service")


class ThoughtController {
  constructor(services) {
    this.services = services
    this.getThoughts = this.getThoughts.bind(this)
  }

  async getThoughts(req, res) {
    try {
      const dbThoughtData = await this.services.ThoughtService.getThoughts()

      res.json(dbThoughtData)
    } catch (error) {
      res.status(500).json(error);
    }
  }
}


module.exports = new ThoughtController({ UserService, ThoughtService })
