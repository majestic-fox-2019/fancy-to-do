const { Todo, User, ProjectUser } = require('../models')

class TodoController {
    static create(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedUser.id,
            ProjectId: null
        })
            .then(createdTodo => {
                res.status(201).json(createdTodo)
            })
            .catch(err => {
                // console.log(err)
                next(err);
            })
    }

    static findAll(req, res, next) {
        // console.log(req.loggedUser.id)
        Todo.findAll({
            where: {
                UserId: req.loggedUser.id,
                ProjectId: null
            }
        })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(todoData => {
                if (req.loggedUser.id !== todoData.UserId) {
                    throw ({
                        statusCode: 401,
                        message: 'You are not authorized to see this page'
                    })
                } else {
                    res.status(200).json(todoData)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateOne(req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            updatedAt: new Date()
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static changeStatus(req, res, next) {
        return Todo.update({
            status: req.body.status
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static filterPersonalTodo(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.loggedUser.id
            }
        })
        .then(userTodo => {
            let filter = req.params.status
            if(req.params.status == 'NotDone'){
                filter = 'Not Done'
            }
            userTodo = userTodo.filter(element => 
                element.status == filter
            )
            res.status(200).json(userTodo)
        })
        .catch(err => {
            next(err)
        })
    }

    static findProjectTodo(req, res, next) {
        Todo.findAll({
            where: {
                ProjectId: req.params.projectId
            }
        })
        .then(ProjectTodos => {
            res.status(200).json(ProjectTodos)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateProjectTodo(req, res, next) {
        Todo.updateOne({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            updatedAt: new Date()
        },{
            where: {
                id: req.params.projectId
            },
            returning: true
        })
        .then(updatedProjectTodo => {
            res.status(200).json(updatedProjectTodo)
        })
        .catch(err => {
            next(err)
        })
    }

    static createProjectTodo(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedUser.id,
            ProjectId: req.params.projectId
        })
        .then(createdTodo => {
            res.status(201).json(createdTodo)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController