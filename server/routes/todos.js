'use strict';

const TodoController = require('./../controllers/TodoController');

const express           = require('express')
const router            = express.Router()
const authorization     = require('./../middlewares/authorization');


router.post('/', TodoController.create);
router.get('/', TodoController.read);
router.get('/:id', authorization, TodoController.findById);
router.put('/:id', authorization, TodoController.update);
router.delete('/:id', authorization, TodoController.delete);

module.exports = router