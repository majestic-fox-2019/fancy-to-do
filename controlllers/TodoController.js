'use strict'

const { Todo } = require('../models')

class TodoController {
    static showAll(req, res, next){
        Todo
            .findAll()
            .then(list => {
                res.status(201).json(list)
            })
            .catch(err => {
                next(err)
            })
    }

    static findById(req, res, next){
        Todo
            .findByPk(req.params.id)
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

        Todo
            .create({
                title,
                description,
                status,
                due_date
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

        let updatedData = ""
        
        Todo
            .findByPk(req.params.id)
            .then(found => {
                if(found){
                    updatedData = found

                    return Todo.update({
                        title,
                        description,
                        status,
                        due_date
                    }, { where: {
                        id: req.params.id
                    }})
                } else {
                    throw {
                        statusCode: 404,
                        message: 'Error! Data not found'
                    }
                }
            })
            .then(updated => {
                res.status(200).json(updatedData)
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
                        message: 'Error! Data not found.'
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
}

module.exports = TodoController