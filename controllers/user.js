const Model = require('../models')
const User = Model.User

class ControllerUser {
  static register(req, res, next) {
    let body = req.body
    User
      .create({
        username: body.username,
        email: body.email,
        password: body.password
      })
      .then()
      .catch()
  }

  static login(req, res, next) {
    User
      .then()
      .catch()
  }

}


module.exports = ControllerUser

