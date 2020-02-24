"use strict"

const { Todo } = require('../models')
const { Project } = require('../models')

class ProjectTodoController {
    static createTodo(req, res, next) {
        const { title, description, due_date } = req.body
        Todo.create({
            title,
            description,
            status: "not complete",
            due_date,
            ProjectId: req.params.projectId
        })
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }
    static findAll(req, res, next) {
        Project.findOne({
            where: {
                id: req.params.projectId
            },
            include: [
                {
                    model: Todo,
                }
            ]
        })
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
                    next(createError(404, "not found Project Todo"))
                } else {
                    res.status(200).json(result)
                }
            }).catch(next);
    }
    static update(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.update({
            title,
            description,
            status,
            due_date,
            updateAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result[0] === 0) {
                    next(createError(404, "not found Project Todo"))
                } else {
                    return Todo.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((hasil) => {
                            res.status(200).json(hasil)
                        }).catch(next);
                }
            }).catch(next);
    }
    static remove(req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result === 0) {
                    next(createError(404, "not found Project Todo"))
                } else {
                    return Todo.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((hasil) => {
                            res.status(200).json(hasil)
                        })
                        .catch(next);
                }
            }).catch(next);
    }
}

module.exports = ProjectTodoController