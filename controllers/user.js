const Model = require('../models')
const User = Model.User
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const axios = require('axios')
const instance = axios.create({
  baseURL: 'https://api.mailboxvalidator.com/v1/validation/single?key=APIkey'
});

class ControllerUser {
  static register(req, res, next) {

    let body = req.body

    instance.get(`&email=${req.body.email}`)
      .then(validateResult => {
        if (validateResult.data.is_verified == "True") {
          return User.create({
            username: body.username,
            email: body.email,
            password: body.password
          })
        } else {
          let err = {
            statusCode: '400',
            message: 'Bad Request'
          }
          next(err)
        }
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch((err) => {
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static login(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    User
      .findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: "Unauthorized" })
        } else {
          if (bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_RAHAYU)

            res.status(200).json(token)
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        }
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }

}



module.exports = ControllerUser

