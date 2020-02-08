const { Todo } = require('../models')
const createError = require('http-errors')
function authorize(req, res, next) {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((todo) => {
      if (!todo) {
        let err = createError(404, 'Todo Not Found')
        next(err)
      } else if (todo.UserId != req.userInfo.id) {
        let err = createError(401, 'Unauthorized user')
        next(err)
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = authorize
