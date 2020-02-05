'use strict';

const Todo = require('./../models').Todo;

class TodoController {
    static create(req, res, next) {
        const {title, description, status, due_date, UserId} = req.body;
        Todo.create({
            title, 
            description, 
            status, 
            due_date,
            UserId: req.user.id
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        })
    }

    static read(req, res, next) {
        Todo
            .findAll()
            .then(todos => {
                res.status(200).json(todos);
            })
            .catch(err => {
                next(err);
            });

    }

    static findById(req, res, next) {
        let idTodo = Number(req.params.id);
        Todo
            .findByPk(idTodo)
            .then(todo => {
                if (todo) {
                    res.status(200).json(todo);
                }else{
                    throw {
                        statusCode: 404,
                        message: "No data found"
                    }
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static update(req, res, next) {
        let idTodo = Number(req.params.id);
        const {title, description, status, due_date} = req.body;
        Todo
            .update({
                title,
                description,
                status,
                due_date
            }, {
                where: {
                    id: idTodo
                },
                returning: true
            })
            .then(result => {
                if (result[0]) {
                    res.status(200).json(result[1][0]);
                }else{
                    throw {
                        statusCode: 404,
                        message: "No data found"
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        let idTodo      = Number(req.params.id);
        let deletedTodo = null;
        Todo
            .findByPk(idTodo)
            .then(todo => {
                deletedTodo = todo;
                return Todo
                    .destroy({
                        where: {
                            id: idTodo
                        }
                    })
            })
            .then(() => {
                if (deletedTodo) {                
                    res.status(200).json(deletedTodo);
                }else{
                    throw {
                        statusCode: 404,
                        message: "No data found"
                    }
                }
            })
            .catch(err => {
                next(err);
            });            
    }


}

module.exports = TodoController;