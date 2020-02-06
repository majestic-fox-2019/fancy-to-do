'use strict';

const { verifyToken } = require('./jwt');
const { User, Todo, Project, UserProject, TodoProject } = require('../models');

function authentication(req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            req.userLoggedIn = verifyToken(req.headers.token);
            User.findByPk(req.userLoggedIn.id)
            .then(user => {
                if(user) {
                    next();
                } else {
                    next({ status: 400, message: 'Invalid access' });
                }
            })
            .catch(next)
        } catch(err) {
            next(err);
        }
    } else {
        next({ status: 401, message: 'You must login first'});
    }
}

function authorizeTodo(req, res, next) {
    const UserId = req.userLoggedIn.id;
    const id = req.params.id;
    Todo.findOne({
        where: {
            id
        }
    })
    .then(todo => {
        if(todo) {
            if(todo.UserId === UserId) {
                next();
            } else {
                next({ status: 400, message: 'Unauthorize' });
            }
        } else {
            next({ status: 404, message: 'Data not found' })
        }
    })
    .catch(next)
}

function authorizeProject(req, res, next) {
    const UserId = req.userLoggedIn.id;
    const id = req.params.id;
    Project.findOne({
        where: {
            id
        }
    })
    .then(project => {
        if(project) {
            if(project.UserId === UserId) {
                next();
            } else {
                next({ status: 400, message: 'Unauthorize' });
            }
        } else {
            next({ status: 404, message: 'Data not found' });
        }
    })
    .catch(next)
}

function authorizeTodoProject(req, res, next) {
     const UserId = req.userLoggedIn.id;
     const ProjectId = req.params.id;

     UserProject.findAll({
         where: {
             ProjectId
         }
     })
     .then(result => {
         let newResult = result.find(index => index.UserId === UserId)
         if(newResult === undefined) {
             next({ status: 404, message: 'Unauthorize' });
         } else {
             next();
         }
     })
     .catch(next)
}

module.exports = {
    authentication,
    authorizeTodo,
    authorizeProject,
    authorizeTodoProject,
}