const router = require('express').Router();
const { getThoughts } = require("../../controllers/thought.controller")

router.route('/').get(getThoughts)

module.exports = router;