const { User, Project, ProjectUser, Todo} = require('../models')

function todoAuth (req, res, next) {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(todoData => {
        // console.log(req.loggedUser.id, '==========', todoData.UserId)
        if(!todoData) {
            throw ({
                statusCode: 404,
                message: 'Todo not found'
            })
        }else if (req.loggedUser.id !== todoData.UserId) {
            throw ({
                statusCode: 401,
                message: 'You are not authorized to access this todo'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

function projectAuth (req, res, next) {
    let projectId = req.params.projectId || req.body.projectId || req.targetTodo
    // console.log(req.targetTodo)
    ProjectUser.findOne({
        where: {
            UserId: req.loggedUser.id,
            ProjectId: projectId
        }
    })
    .then(projectData => {
        // console.log(projectData)
        if(projectData){
            // console.log('MASUK SINI');
            next()
        } else {
        throw ({
            statusCode: 401,
            message: 'You are not authorized to access this project'
        })
        }
    })
    .catch(err => {
        next(err)
    })
}

function projectTodoAuth(req, res, next) {   
    // console.log('already HERE'); 
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(todoData => {
        // console.log(todoData)
        req.targetTodo = todoData.ProjectId
        next()
    })
    .catch(err => {
        next(err)
    })
}

function deleteProjectAuth(req, res, next) {
    ProjectUser.findOne({
        where: {
            UserId: req.loggedUser.id,
            ProjectId: req.params.projectId
        },
        include: [{ model: Project }]
    })
    .then(projectData => {
        if(projectData.Project.owner !== req.loggedUser.id){
            throw ({
                statusCode: 401,
                message: 'Only project owner are allowed to delete this project'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    todoAuth,
    projectAuth,
    deleteProjectAuth,
    projectTodoAuth
}