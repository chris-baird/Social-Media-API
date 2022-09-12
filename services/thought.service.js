const { Thought } = require("../models")

class ThoughtService {
  constructor(services) {
    this.services = services
    this.removeReaction = this.removeReaction.bind(this)
  }

  removeReaction(dbUserData) {
    return this.services.Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
  }
}

module.exports = new ThoughtService({ Thought })