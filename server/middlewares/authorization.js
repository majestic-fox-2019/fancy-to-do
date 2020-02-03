const { Todo } = require('../models')

module.exports = (req, res, next) => {
  const userID = req.loggedIn.id
  try {
    Todo.findOne({ where: { UserId: userID } }).then(result => {
      if (!result) {
        throw err
      } else {
        next()
      }
    })
  } catch (err) {
    err.errCoode = 403
    err.msg = 'Sorry you are not authorized'
    next(err)
  }
}
