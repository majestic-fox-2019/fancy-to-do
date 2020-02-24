const { Todo } = require('../models/index')
const createError = require('http-errors')

class TodoController {
    static getTodos(req, res, next) {
        Todo.findAll({
            order: [['id', 'ASC']],
            where : {UserId : req.loggedUserId}
        }).then(todos => {
            if (todos.length > 0) {
                res.status(200).json(todos)
            } else {
                throw createError(404, 'Data not found')
            }
        }).catch(next)
    }

    static addTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.create({ title, description, status, due_date, UserId: req.loggedUserId })
            .then(result => {
                res.status(201).json(result)
            }).catch(next)
    }

    static getTodoItem(req, res, next) {
        Todo.findOne({
            where: { id: req.params.id }
        }).then(todo => {
            if (todo) {
                res.status(200).json(todo)
            } else {
                throw createError(404, `Data Not found`)
            }
        }).catch(next)
    }

    static editTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date },
            {
                where: { id: req.params.id },
                returning: true,
                individualHooks: true
            }).then(result => {
                res.status(200).json(result[1][0])
            }).catch(next)
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
                    throw createError(404, `Data Not Found`)
                }
            }).catch(next)
    }
}

module.exports = TodoController