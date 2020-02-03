const { Todo } = require('../models/index')
const createError = require('http-errors')

class TodoController {
    static getTodos(req, res, next) {
        Todo.findAll({
            order: [['id', 'ASC']]
        }).then(todos => {
            if (todos.length > 0) {
                res.status(200).json(todos)
            } else {
                res.status(200).json({ message: 'Tidak ada data' })
            }
        }).catch(err => next(err))
    }

    static addTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.create({ title, description, status, due_date })
            .then(result => {
                res.status(201).json(result)
            }).catch(err => {
                next(err)
            })
    }

    static getTodoItem(req, res, next) {
        Todo.findOne({
            where: { id: req.params.id }
        }).then(todo => {
            if (todo) {
                res.status(200).json(todo)
            } else (
                next(createError(404, `Not found`))
            )
        }).catch(err => next(err))
    }

    static editTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.update({
            title,
            description,
            status,
            due_date
        }, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true
        }).then(todo => {
            if (todo[0] == 0) {
                next(createError(404, `Not Found`))
            } else {
                res.status(200).json(todo[1][0])
            }
        }).catch(err => {
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        const findOne = Todo.findOne({
            where: { id: Number(req.params.id) }
        })
        const destroy = Todo.destroy({
            where: { id: Number(req.params.id) }
        })

        Promise.all([findOne, destroy])
            .then(result => {
                if (result[0] !== null && result[1] === 1) {
                    res.status(200).json(result[0])
                } else {
                    next(createError(404, `Not Found`))
                }
            }).catch(err => next(err))
    }
}

module.exports = TodoController