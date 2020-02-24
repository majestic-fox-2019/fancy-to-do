"use strict"

const { Todo } = require("../models")
const createError = require('http-errors')

function authorized(req, res, next) {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(todo => {
            if (!todo) {
                next(createError(404, "data not found"))
            } else if (todo.UserId === req.user.id) {
                next()
            } else {
                next(createError(401, "Unauthorized"))
            }
        })
        .catch(next)
}

module.exports = authorized