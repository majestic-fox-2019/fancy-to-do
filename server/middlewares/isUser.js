const { User } = require('../models/index')
const createError = require('http-errors')
const verify = require('../helper/jwtVerify')

module.exports = (req, res, next) => {

  const id = verify(req.headers.token).user.id

  User
    .findOne({
      where: {
        id
      }
    })
    .then(response => {
      console.log(response)
      if (response == null) {
        throw createError(404, { message: { error: `User Doesn't Exist!` } })
      } else {
        next()
      }
    })
    .catch(next)
}