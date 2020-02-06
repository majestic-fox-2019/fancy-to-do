const { User } = require('../models')
const { sign } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static register(req, res, next) {
    const form = {
      email: req.body.email || null,
      password: req.body.password || null
    }
    User.create(form)
      .then(result => {
        const token = sign({ id: result.id }, process.env.JWT_SECRET)
        res.status(201).json({
          result: result,
          token: token
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const form = {
      email: req.body.email || null,
      password: req.body.password || null
    }
    User.findOne({ where: { email: form.email } })
      .then(result => {
        if (!result) {
          throw { errCode: 404, msg: 'Email or Password is invalid' }
        } else {
          const valid = comparePass(form.password, result.password)
          if (valid) {
            const token = sign({ id: result.id }, process.env.JWT_SECRET)
            res.status(200).json({
              result: result,
              token: token
            })
          } else {
            throw { errCode: 400, msg: 'Email or Password is invalid' }
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static googleSign(req, res, next) {
    let payload
    let data
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        data = {
          email: payload.email,
          password: process.env.DEFAULT_PASS
        }
        return User.findOne({ where: { email: payload.email } })
      })
      .then(result => {
        if (result) {
          const token = sign({ id: result.id }, process.env.JWT_SECRET)
          res.status(200).json({
            result: result,
            token: token
          })
        } else {
          return User.create(data)
        }
      })
      .then(data => {
        const token = sign({ id: data.id }, process.env.JWT_SECRET)
        res.status(200).json({
          result: data,
          token: token
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController
