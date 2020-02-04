'use strict';

const { Todo } = require('../models');

class TodoController {
    static create(req, res, next) {
        const { title, description } = req.body;
        Todo.create({
            title,
            description,
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
        })
    }

    static readAll(req, res, next) {
        Todo.findAll({})
        .then(todos => {
            res.status(200).json(todos);
        })
        .catch(err => {
            console.log(err);
        })
    }
 }

module.exports = TodoController;