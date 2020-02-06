'use strict';

const router = require('express').Router();
const TodoRouter = require('./TodoRouter');
const ProjectRouter = require('./ProjectRouter');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user', authentication, UserController.getUser);

router.use(authentication);
router.use('/todos', TodoRouter);
router.use('/projects', ProjectRouter);

module.exports = router;