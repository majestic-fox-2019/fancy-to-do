const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models');

module.exports = {
  authentication: function (req, res, next) {
    const { access_token } = req.headers;
    // try verifying token
    try {
      const { email } = verifyToken(access_token);
      User.findOne({
        where: {
          email
        }
      })
        .then((result) => {
          if (!result) {
            next(createError(400, "Email or Password wrong"))
          }
          req.headers.user = result.dataValues;
          next();
        });
    } catch (err) {
      next(err);
    }
  },
  authorization: function (req, res, next) {
    const { id } = req.params;
    const { id: UserId } = req.headers.user;
    Todo.findOne({
      where: {
        id
      }
    })
      .then((result) => {
        if (!result) {
          next(createError(404));
        }
        else {
          console.log(UserId);
          if (result.UserId !== UserId) {
            next(createError(401));
          }
          else {
            next()
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};
