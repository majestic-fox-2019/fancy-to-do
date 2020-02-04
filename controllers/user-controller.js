"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { User } = require("../models");

class UserController {
  static login(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) {
          throw createError(404, "User not found!");
        }
        else {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const userData = {
              id: user.id,
              email: user.email
            };
            res.status(200).json({ token: jwt.sign({ user: userData }, process.env.secret_key) });
            next();
          }
          else {
            throw createError(401, "Wrong email or password!");
          }
        }
      })
      .catch(err => {
        if (err.status != 500) {
          res.status(err.status).json(err);
        }
        else {
          res.status(500).json({ message: "Internal server error!" });
        }
      });
  }

  static register(req, res, next) {
    const userData = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(userData)
      .then(user => {
        res.status(201).json({ email: userData.email });
      })
      .catch(err => {
        next({ status_code: 400 });
      });
  }
}

module.exports = {
  UserController
};