'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Password must be filled'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate : (user, options) => {
        user.password = bcrypt.hashSync(user.password, 15)
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  
  return User;
};