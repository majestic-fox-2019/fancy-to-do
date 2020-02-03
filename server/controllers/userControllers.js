const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    const form = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(form)
      .then(result => {
        const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
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
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({ where: { email: form.email } })
      .then(result => {
        if (!result) {
          throw createError(404, 'User not found')
        } else {
          const valid = comparePass(form.password, result.password)
          if (valid) {
            const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
            res.status(200).json({
              result: result,
              token: token
            })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController
