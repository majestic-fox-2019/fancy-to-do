const { User } = require('../models/index')
const Helper = require('../helper/helper')
const signUser = require('../helper/jwtSign')
const comparePassword = require('../helper/comparePassword')
const createError = require('http-errors')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const mailSender = require('../helper/mailSender')
const registerTemplate = require('../helper/registerTemplate')

class UserController {

  static googleSignIn(req, res, next) {
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
      .then(response => {
        const payload = response.getPayload()
        return User
          .findOne({
            where: {
              email: payload.email
            }
          })
          .then(response => {
            console.log(payload)
            if (response != null) {
              const user = Helper.authData(response.dataValues)
              const token = signUser(user)
              res.status(201).json({ token, name: response.name })
            } else {
              return User
                .create({
                  email: payload.email,
                  password: 'social',
                  name: payload.name,
                  logintype: 'google'
                })
            }
          })
      })
      .then(response => {
        const user = Helper.authData(response.dataValues)
        const token = signUser(user)
        res.status(201).json({ token, name: response.name })
      })
      .catch(next)
  }

  static register(req, res, next) {
    let objValue = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      logintype: 'local'
    }
    User
      .create(objValue)
      .then(response => {
        res.status(200).json(response)
        mailSender(response.email, response.name, 'Successfully Register Into Fancy Todo', registerTemplate(response.name))
      })
      .catch(next)
  }

  static login(req, res, next) {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(response => {
        if (response != null) {
          if (comparePassword(req.body.password, response.password)) {
            const user = Helper.authData(response.dataValues)
            const token = signUser(user)
            res.status(201).json({ token, name: response.name })
          } else {
            throw createError(403, { message: { error: 'Wrong email or password!' } })
          }
        } else {
          throw createError(404, { message: { error: `Email doesn't exist!` } })
        }
      })
      .catch(next)
  }

}

module.exports = UserController