"use strict"

const { Todo } = require("../models")

class TodoController {
    static createTodo(req, res, next) {
        const { title, description, due_date } = req.body
        Todo.create({
            title,
            description,
            status: "not complete",
            due_date
        })
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next);
    }
    static findAll(req, res, next) {
        Todo.findAll()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next);
    }
    static findOne(req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (!result) {
                    next({
                        status: 404,
                        msg: "not found"
                    })
                } else {
                    res.status(200).json(result)
                }
            })
            .catch(next);
    }
    static update(req, res, next) {
        const { title, description } = req.body
        let arr = []
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                arr = result
                if (!result) {
                    next({
                        status: 404,
                        msg: "not found"
                    })
                } else {
                    return Todo.update({
                        title,
                        description,
                        updateAt: new Date()
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            res.status(200).json(arr)
                        })
                }
            })
            .catch(next);
    }
    static remove(req, res, next) {
        let todo = null
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                todo = result
                if (!result) {
                    next({
                        status: 404,
                        msg: "not found "
                    })
                } else {
                    return Todo.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            res.status(200).json(todo)
                        })
                }
            })
            .catch(next);
    }
}

module.exports = TodoController