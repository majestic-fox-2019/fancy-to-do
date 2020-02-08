'use strict';

const bcrypt = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        },
        notEmpty: { args: true, msg: 'email is required' },
        checkUnique(data) {
          return User.findOne({ where: { email: data } })
            .then(user => {
              if (user) {
                throw new Error('Email address already in use!')
              }
            })
        }
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'password is required' }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let pass = user.password
        let newPass = bcrypt.generatePassword(pass)
        user.password = newPass
      }
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, { through: models.userProject })
  };
  return User;
};