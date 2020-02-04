const createError = require('http-errors');
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { encryptToken } = require('../helpers/jwt');

class userController {
  // register
  static register(req, res, next) {
    const userForm = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userForm)
      .then((result) => {
        res.status(201);
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
  // login
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then((result) => {
        if (!result) {
          next(createError(400, "Email or Password wrong"));
        }
        else {
          const isValid = comparePassword(password, result.password);
          if (!isValid) {
            next(createError(400, "Email or Password wrong"));
          }
          else {
            const access_token = encryptToken({
              email: result.email
            });
            const payload = {
              name: result.name,
              access_token
            }
            res.status(200);
            res.json(payload);
          }
        }
      }).catch((err) => {
          next(err);
        });
  }
}

module.exports = userController;