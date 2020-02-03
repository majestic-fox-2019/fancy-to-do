"use strict"

const { Todo } = require("../models")

class TodoController {
    static createTodo(req, res) {
        const { title, description, due_date } = req.body
        console.log(req.body);
        Todo.create({
            title,
            description,
            status: "not complete",
            due_date
        })
            .then((result) => {
                console.log(result);
                res.status(201).json(result)
            }).catch((err) => {
                res.status(err.status).json(err)
            });
    }
    static findAll(req, res) {
        Todo.findAll()
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(err.status).json(err)
            });
    }
    static findOne(req, res) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (!result) {
                    res.status(404).json("not found")
                } else {
                    res.status(200).json(result)
                }
            }).catch((err) => {
                res.status(err.status).json(err)
            });
    }
    static update(req, res) {
        const { title, description } = req.body
        Todo.update({
            title,
            description
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (!result) {
                    res.status(404).json("not found")
                } else {
                    return Todo.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(err.status).json(err)
            });
    }
    static remove(req, res) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (!result) {
                    res.status(404).json("not found")
                } else {
                    return Todo.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(err.status).json(err)
            });
    }
}

module.exports = TodoController