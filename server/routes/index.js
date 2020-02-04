'use strict';

const router = require('express').Router();
const TodoRouter = require('./TodoRouter');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/auth');

router.post('/register', UserController.register);

router.use(authentication);
router.use('/todos', TodoRouter);

module.exports = router;