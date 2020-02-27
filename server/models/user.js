'use strict';
const hashPassword = require("../helpers/hashPassword")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "Email is invalid" },
        isUnique(value) {
          return User.findAll({ where: { email: value } })
            .then(userFound => {
              if (userFound.length > 0) {
                throw new Error(`email ${value} is already registered`)
              }
            })
        },
        notNull: { msg: "email is required" },
        notEmpty: { msg: "email should not be empty" }
      }, allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "username is required" },
        notEmpty: { msg: "username should not be empty" }
      }, allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "password should not be empty" },
        notNull: { msg: "password is required" },
        min: {
          args: 6,
          msg: "minimal character for password is 6"
        }
      }, allowNull: false
    }
  }, {
      hooks: {
        beforeCreate: (instance, options) => {
          let hashed = hashPassword(instance.password)
          instance.password = hashed
        }
      }, sequelize
    })
  User.associate = function (models) {
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, { through: models.ProjectUser })
  };
  return User;
};