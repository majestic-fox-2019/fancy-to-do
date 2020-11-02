const createError = require('http-errors');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/bcrypt');
const { encryptToken } = require('../helpers/jwt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController {
  // register
  static register(req, res, next) {
    const userForm = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userForm)
      .then((createdUser) => {
        res.status(201);
        res.json(createdUser);
      })
      .catch((err) => {
        next(err);
      });
  }
  // login
  static login(req, res, next) {
    console.log(req.body);
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          next(createError(400, "Email or Password wrong"));
        }
        else {
          const isValid = comparePassword(password, foundUser.password);
          if (!isValid) {
            next(createError(400, "Email or Password wrong"));
          }
          else {
            const access_token = encryptToken({
              email: foundUser.email
            });
            const payload = {
              name: foundUser.name,
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
  // g-signin
  static gsignin(req, res, next) {
    const { id_token } = req.body;
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        const payload = ticket.getPayload();
        const { email, name } = payload;
        // find email
        User.findOne({
          where: {
            email
          }
        })
          .then((foundUser) => {
            if (!foundUser) {
              User.create({
                name,
                email,
                password: process.env.DEFAULT_PASSWORD
              })
                .then((createdUser) => {
                  const access_token = encryptToken({
                    email: createdUser.email
                  });
                  const payload = {
                    name: createdUser.name,
                    access_token
                  }
                  res.status(200);
                  res.json(payload);
                })
                .catch((err) => {
                  next(err);
                })
            }
            else {
              console.log(foundUser.email);
              const access_token = encryptToken({
                email: foundUser.email
              });
              const payload = {
                name: foundUser.name,
                access_token
              }
              res.status(200);
              res.json(payload);
            }
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = userController;