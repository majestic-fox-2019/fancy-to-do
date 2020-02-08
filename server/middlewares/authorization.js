const {Task} = require('../models')
const createError = require('http-errors')

module.exports = function(req, res, next){
  Task.findByPk(req.params.id)
  .then(result => {
    if (!result) {
      throw createError(404, { message: { message: 'Not Found' } })
    } else if (result.UserId !== req.user.id || !req.user) {
      throw createError(401, { message: { message: 'Not Authorized' } })
    } else {
      next()
    }
  })
  .catch(error => {
    next(error)
  })
}