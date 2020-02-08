'use strict';

const ProjectController = require('../controllers/ProjectController');
const router = require('express').Router();
const { authorizeProject, authorizeTodoProject } = require('../middlewares/auth');

router.post('/', ProjectController.create);
router.get('/', ProjectController.readAll);

router.put('/:id', authorizeProject, ProjectController.update);
router.delete('/:id', authorizeProject, ProjectController.delete);

router.post('/:id/user', authorizeProject, ProjectController.addUserProject);
router.post('/:id/todo', authorizeTodoProject, ProjectController.addTodoProject);
router.get('/:id/todos', authorizeTodoProject, ProjectController.readAllTodoProject);
router.get('/:id/users', authorizeTodoProject, ProjectController.getUserTodoProject);

router.put('/:id/todo/:idtodo', authorizeTodoProject, ProjectController.updateTodoProject);
router.get('/:id/todo/:idtodo', authorizeTodoProject, ProjectController.readOneTodoProject);
router.delete('/:id/todo/:idtodo', authorizeTodoProject, ProjectController.delTodoProject);

module.exports = router;
