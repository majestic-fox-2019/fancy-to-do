'use strict'

const { Todo, User } = require('../models')

class TodoController {
    static showAll(req, res, next){
        Todo
            .findAll({
                where: {
                    UserId: req.user.id
                }
            })
            .then(list => {
                res.status(200).json(list)
            })
            .catch(err => {
                next(err)
            })
    }

    static findById(req, res, next){
        Todo
            .findOne({
                where: {
                    id: req.params.id,
                }
            })
            .then(found => {
                if (found){
                    res.status(200).json(found)
                } else {
                    throw {
                            statusCode: 404,
                            message: 'Error! Data not found'
                        }
                    }
            })
            .catch(err => {
                next(err)
            })
    }

    static createTodo(req, res, next){
        let { title, description, status, due_date } = req.body
        let id = req.user.id
        Todo
            .create({
                title,
                description,
                status,
                due_date,
                UserId: id
            })
            .then(created => {
                res.status(201).json(created)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTodo(req, res, next){
        let { title, description, status, due_date } = req.body
        
        Todo
            .findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            })
            .then(found => {
                if(found){
                    return found.update({
                        title,
                        description,
                        status,
                        due_date
                    },
                    {   
                        returning:true
                    })
                } else {
                    throw {
                        statusCode: 404,
                        message: 'Error! Data not found'
                    }
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                next(err)
            })
    }
    
    static deleteTodo(req, res, next){
        let deletedData = ""

        Todo
            .findByPk(req.params.id)
            .then(deleted => {
                deletedData = deleted

                if (deleted){
                    return Todo.destroy({   
                        where: {
                            id: req.params.id
                        }
                    })
                } else {
                    throw {
                        statusCode: 404,
                        message: 'Error! Data not found'
                    }
                }
            })
            .then(result => {
                res.status(200).json(deletedData)
            })
            .catch(err => {
                next(err)
            })
    }

    static authorization(req, res, next){
        Todo
            .findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            })
            .then(found => {
                if(found){
                    next()
                } else {
                    throw {
                        statusCode: 401,
                        message: 'Unauthorized Access'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController