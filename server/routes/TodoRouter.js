'use strict';

const TodoController = require('../controllers/TodoController');
const router = require('express').Router();

router.post('/', TodoController.create);
router.get('/', TodoController.readAll);

module.exports = router;