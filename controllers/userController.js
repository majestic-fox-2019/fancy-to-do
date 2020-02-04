const {User} = require('../models')
const createError = require('http-errors')

class UserController {

  static register(req, res, next){
    let userData = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      next(createError(400, {message: {error:"Validation Errors"}}))
    });
  }

  // static login(req, res, next){

  // }

}

module.exports = UserController