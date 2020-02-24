'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const becrypt = require('bcryptjs')
  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Incorrect email format, e.g: example@mail.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [8, 20],
          msg: 'Password at least 8 character'
        }
      }
    }
  },
    {
      hooks: {
        beforeCreate: (instance, option) => {
          instance.password = becrypt.hashSync(instance.password, becrypt.genSaltSync(10))
        }
      }, sequelize
    });
  User.associate = function (models) {
    User.hasMany(models.Todo)
  };
  return User;
};