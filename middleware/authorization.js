const { Todo } = require('../models')
const createError = require('http-errors')

module.exports = function (req, res, next) {
  Todo
    .findOne({
      where: {
        UserId: req.user.id,
        id: req.params.id
      }
    })
    .then(result => {
      if (result) {
        next()
      } else {
        throw createError(401, 'Unauthorized!')
      }
    })
    .catch(err => {
      next(err)
    })
}