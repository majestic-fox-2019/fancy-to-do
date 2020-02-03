'use strict';

const TodoController = require('./../controllers/TodoController');

const express   = require('express')
const router    = express.Router()


router.post('/', TodoController.create);
router.get('/', TodoController.read);
router.get('/:id', TodoController.findById);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router