const express = require('express');
const router = express.Router();
const Todo = require('./todo')
const User = require('./user')

router.use('/', User)
router.use('/todos', Todo)
module.exports = router