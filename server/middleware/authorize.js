"use strict"

const { Todo } = require('../models')

function authorized(req, res, next) {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(todo => {
            if (!todo) {
                next({
                    status: 404,
                    message: 'data not found'
                })
            } else if (todo.UserId === req.user.id) {
                next()
            } else {
                next({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
        })
        .catch(next)
}

module.exports = authorized