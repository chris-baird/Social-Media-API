const router = require('express').Router();
const { getUsers, getSingleUser } = require("../../controllers/user.controller")

router.route('/').get(getUsers)

router.route('/:userId').get(getSingleUser)

module.exports = router;
