const { User } = require('../models')
const createError = require('http-errors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
      username: req.body.username,
      password: req.body.password
    }

    User
      .findOne({
        where: {
          username: user.username
        }
      })
      .then(result => {
        let compare = bcrypt.compareSync(user.password, result.password)
        if (compare) {
          const token = jwt.sign({ username: result.username, id: result.id }, process.env.JWT_KEY);
          res.status(200).json(token)
        } else {
          throw createError(400, 'User not found!')
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOjEsImlhdCI6MTU4MDc5NTk4Nn0.uPEM53p1UX522PFrNCcE5DmEh-h6S3uD9vto5WQEKHw

module.exports = UserController