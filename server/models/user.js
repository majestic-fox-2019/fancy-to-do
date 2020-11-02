"use strict";
var bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user, options) {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Todo);
  };
  return User;
};
