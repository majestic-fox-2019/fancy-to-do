const {Task} = require('../models')
const createError = require('http-errors')

module.exports = function(req, res, next){
  Task.findByPk(req.params.id)
  .then(result => {
    if (result.UserId !== req.user.id || !req.user) {
      throw createError(401, { message: { error: 'Not Authorized' } })
    }
    next()
  })
  .catch(error => {
    next(error)
  })
}