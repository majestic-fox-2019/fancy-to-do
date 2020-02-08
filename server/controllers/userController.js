const { User } = require('../models')
const createError = require('http-errors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


class UserController {
  static findAll(req, res, next) {
    User
      .findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static register(req, res, next) {
    let user = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    User
      .create(user)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        // if (err.message) {
        //   err.status = 400
        // }
        next(err)
        // res.send(err)
      })
  }

  static login(req, res, next) {
    let user = {
      email: req.body.email,
      password: req.body.password
    }

    User
      .findOne({
        where: {
          email: user.email
        }
      })
      .then(result => {
        console.log(result, 'result login')
        if (result == null) {
          throw createError(400, 'User not found!')
        }
        let compare = bcrypt.compareSync(user.password, result.password)

        console.log(compare, '< compare')
        if (compare) {
          const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_KEY);
          res.status(200).json(token)
        } else {
          throw createError(400, 'User not found!')
        }
      })
      .catch(err => {
        console.log(err, '< masuk sini')
        next(err)
      })
  }

  static googleSignIn(req, res, next) {
    let user = null
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(result => {
        user = result.getPayload()
        return User
          .findOne({
            where: {
              email: user.email
            }
          })
      })
      .then(result => {
        if (result) {
          const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_KEY);
          res.status(200).json(token)
        } else {
          return User
            .create({
              name: user.family_name,
              email: user.email
            }, {
              hooks: false
            })
        }
      })
      .then(result => {
        const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_KEY);
        res.status(200).json(token)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController