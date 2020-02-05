const { Todo } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    Todo.findByPk(req.params.id)
        .then(todo => {
            if (todo) {
                if (todo.UserId == req.loggedUserId) {
                    next()
                } else {
                    throw createError(401, 'You do not have access to this action')
                }
            } else {
                throw createError(404, 'Todo not found')
            }
        })
        .catch(next)
}