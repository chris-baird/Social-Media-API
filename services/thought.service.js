const { Thought } = require("../models")

class ThoughtService {
  constructor(services) {
    this.services = services
    this.getThoughts = this.getThoughts.bind(this)
    this.removeReaction = this.removeReaction.bind(this)
  }

  getThoughts() {
    return Thought.find()
      .sort({ createdAt: -1 })
  }

  removeReaction(dbUserData) {
    return this.services.Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
  }
}

module.exports = new ThoughtService({ Thought })