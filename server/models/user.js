'use strict';

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email wajib diisi!'
        },
        isEmail: {
          msg: 'Format email salah!'
        },
        isUnique: (value) => {
          return User
            .findAll({
              where: {
                email: value,
              },
              hooks: false
            })
            .then(response => {
              if (response.length > 0) {
                throw new Error('Email telah terpakai!')
              }
            })
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password wajib diisi!'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Nama wajib diisi!'
        }
      }
    },
    logintype: DataTypes.STRING
  }, {
    hooks: {

      beforeCreate: (instance, options) => {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }

    }
    , sequelize
  })

  User.associate = function (models) {
    User.hasMany(models.Todo)
  };
  return User;
};