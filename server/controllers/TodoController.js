'use strict';

const { Todo, User } = require('../models');

class TodoController {
    static create(req, res, next) {
        const { title, description, dueDate } = req.body;
        const UserId = req.userLoggedIn.id;
        Todo.create({
            title,
            description,
            status: 'process',
            dueDate,
            UserId,
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        const UserId = req.userLoggedIn.id;
        Todo.findAll(
            {
                where: {
                    UserId
                },
                include:  User,
            }
        )
        .then(todos => {
            res.status(200).json(todos);
        })
        .catch(next)
    }
    static readOne(req, res, next) {
        const id = req.params.id;
        Todo.findOne(
            {
                where: {
                    id
                },
                include:  User,
            }
        )
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(next)
    }

    static update(req, res, next) {
        const { title, description, status, dueDate } = req.body;
        const id = req.params.id;
        Todo.update(
            {
                title,
                description,
                dueDate,
                status
            },
            {
                where: {
                    id
                }
            }
            )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id;
        Todo.destroy({ where: { id }})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }
 }

module.exports = TodoController;