const { Todo, User } = require('../models')

class TodoController {
    static create(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedUser.id
        })
        .then(createdTodo => {
            res.status(201).json(createdTodo)
        })
        .catch(err => {
            next(err);
        })
    }

    static findAll(req, res, next){
        Todo.findAll({
            where: {
                id: req.loggedUser.id
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next){
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(todoData => {
            if(req.loggedUser.id !== todoData.UserId){
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

    static updateOne(req, res, next){
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(todoData => {
            if(req.loggedUser.id !== todoData.UserId){
                throw ({
                    statusCode: 401,
                    message: 'You are not authorized to edit this todo'
                })
            } else {
                return Todo.update({
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.due_date,
                    UserId: req.loggedUser.id,
                    updatedAt: new Date()
                },{
                    where: {
                        id: req.params.id
                    },
                    returning: true
                })
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static changeStatus(req, res, next) {
        Todo.findOne({
            id: req.params.id
        })
        .then(todoData => {
            if(req.loggedUser.id !== todoData.UserId){
                throw ({
                    statusCode: 401,
                    message: 'You are not authorized to change this Todo status'
                })
            } else {
                return Todo.update({
                    status: req.body.status
                },{
                    where: {
                        id: req.params.id
                    },
                    returning: true
                })
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Todo.findOne({
            id: req.params.id
        }) 
        .then(todoData => {
            // console.log(todoData.UserId)
            if(req.loggedUser.id !== todoData.UserId) {
                throw ({
                    statusCode: 401,
                    message: 'You are not authorized to delete this todo'
                })
            } else {
                return Todo.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController