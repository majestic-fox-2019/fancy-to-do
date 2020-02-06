'use strict';

const ProjectController = require('../controllers/ProjectController');
const router = require('express').Router();
const { authorizeProject, authorizeTodoProject } = require('../middlewares/auth');

router.post('/', ProjectController.create);
router.get('/', ProjectController.readAll);

router.put('/:id', authorizeProject, ProjectController.update);
router.delete('/:id', authorizeProject, ProjectController.delete);

router.post('/:id/addUser', authorizeProject, ProjectController.addUserProject);
router.post('/:id/addTodo', authorizeTodoProject, ProjectController.addTodoProject);
router.get('/:id/findTodo', authorizeTodoProject, ProjectController.readAllTodoProject);

module.exports = router;
