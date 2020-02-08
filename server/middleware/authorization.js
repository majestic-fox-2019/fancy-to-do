const { Todo } = require('../models')
const createError = require('http-errors')

module.exports = function (req, res, next) {
  Todo
    // .findOne({
    //   where: {
    //     UserId: req.user.id,
    //     id: req.params.id
    //   }
    // })
    // .then(result => {
    //   if (result) {
    //     next()
    //   } else {
    //     throw createError(401, 'Unauthorized!')
    //   }
    // })
    // .catch(err => {
    //   next(err)
    // })
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      // console.log(result, '< ini result')
      if (result == null) {
        // next()
        throw createError(404, 'Not found!')
      } else if (result.UserId == req.user.id) {
        next()
      } else if (result.UserId !== req.user.id) {
        throw createError(401, 'Unauthorized!')
        // } else {
      }
    })
    .catch(err => {
      // console.log(err, '< ini err')
      next(err)
    })
}