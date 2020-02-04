const Model = require('../models')
const Todo = Model.Todo
const errorss = require('http-errors')

module.exports = (req, res, next) => {
  Todo
    .findOne({ where: { UserId: req.user.id, id: req.params.id } })
    .then(resultUser => {
      if (resultUser) {
        next()
      } else {
        throw ({
          statusCode: '401',
          message: 'Unauthorized'
        })
        // throw errorss('401', 'Unauthorized')
      }
    })
    .catch(err => {
      next(err)
    })

}
